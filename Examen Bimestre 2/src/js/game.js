// Vertical Slice: Shooter 2D ultra simple
// Objetivo: mover + disparar + enemigo con vida + feedback + "Slice completado".

const W = 960;
const H = 540;

// Helpers
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.player = null;
    this.enemy = null;
    this.bullets = null;

    this.playerHP = 5;
    this.enemyHP = 6;

    this.lastShot = 0;
    this.shotCooldownMs = 180;

    this.gameOver = false;
  }

  preload() {
    // No assets necesarios: usaremos gráficos básicos.
  }

  create() {
    // Fondo
    this.add.rectangle(W/2, H/2, W, H, 0x1b1f2a);

    // Bordes / "pasillo"
    this.add.rectangle(W/2, 60, W, 12, 0x2b3245);
    this.add.rectangle(W/2, H-60, W, 12, 0x2b3245);

    // Player (rectángulo azul con física)
    this.player = this.add.rectangle(120, H/2, 28, 28, 0x2d6cdf);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Enemy (rectángulo rojo con física)
    this.enemy = this.add.rectangle(W-140, H/2, 30, 30, 0xdf3b3b);
    this.physics.add.existing(this.enemy);
    this.enemy.body.setCollideWorldBounds(true);

    // Grupo de balas
    this.bullets = this.physics.add.group();

    // Input
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up2: Phaser.Input.Keyboard.KeyCodes.UP,
      down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      shootSpace: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    // Disparo con mouse
    this.input.on("pointerdown", () => this.tryShoot());

    // Disparo con espacio
    this.input.keyboard.on("keydown-SPACE", () => this.tryShoot());

    // Colisión bala -> enemigo
    this.physics.add.overlap(this.bullets, this.enemy, (bullet, enemy) => {
      bullet.destroy();
      this.damageEnemy(1);
    });

    // UI (texto)
    this.ui = {
      title: this.add.text(16, 12, "Vertical Slice - Shooter 2D", { fontSize: "18px", color: "#ffffff" }),
      help: this.add.text(16, 36, "WASD/Flechas mover | Click/Espacio disparar | Objetivo: derrotar enemigo", { fontSize: "14px", color: "#cfd6e6" }),
      hp: this.add.text(16, 62, "", { fontSize: "14px", color: "#ffffff" }),
      status: this.add.text(16, 86, "", { fontSize: "16px", color: "#ffffff" })
    };

    this.updateUI();

    // Límite mundo
    this.physics.world.setBounds(0, 0, W, H);

    // “Pasillo”: restringir movimiento en Y (para que se sienta controlado)
    // Vamos a limitar Y entre 90 y H-90 en update.
  }

  update(time, delta) {
    if (this.gameOver) return;

    // Movimiento player
    const speed = 260;
    let vx = 0, vy = 0;

    const left = this.keys.left.isDown || this.keys.left2.isDown;
    const right = this.keys.right.isDown || this.keys.right2.isDown;
    const up = this.keys.up.isDown || this.keys.up2.isDown;
    const down = this.keys.down.isDown || this.keys.down2.isDown;

    if (left) vx -= 1;
    if (right) vx += 1;
    if (up) vy -= 1;
    if (down) vy += 1;

    // Normaliza diagonal
    const len = Math.hypot(vx, vy) || 1;
    vx = (vx / len) * speed;
    vy = (vy / len) * speed;

    this.player.body.setVelocity(vx, vy);

    // Mantener en "pasillo"
    this.player.y = clamp(this.player.y, 90, H - 90);

    // IA enemigo: perseguir si está vivo
    this.updateEnemyAI(delta);

    // Bullets: limpiar si salen de pantalla
    this.bullets.children.each((b) => {
      if (!b.active) return;
      if (b.x < -50 || b.x > W + 50 || b.y < -50 || b.y > H + 50) {
        b.destroy();
      }
    });
  }

  updateEnemyAI(delta) {
    if (!this.enemy || !this.enemy.active) return;

    const speed = 140;
    const dx = this.player.x - this.enemy.x;
    const dy = this.player.y - this.enemy.y;
    const dist = Math.hypot(dx, dy);

    // Distancia de stop (no se pega al player)
    const stopDist = 50;

    if (dist > stopDist) {
      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;
      this.enemy.body.setVelocity(vx, vy);
    } else {
      this.enemy.body.setVelocity(0, 0);

      // Si está cerca, hace "daño por contacto" cada cierto tiempo
      // (esto agrega presión y dinámica)
      this.tryContactDamage();
    }

    // Pasillo
    this.enemy.y = clamp(this.enemy.y, 90, H - 90);
  }

  tryContactDamage() {
    // Daño al player cada 700ms si está pegado
    if (!this._lastContact) this._lastContact = 0;

    const now = this.time.now;
    if (now - this._lastContact < 700) return;

    this._lastContact = now;
    this.damagePlayer(1);
  }

  tryShoot() {
    const now = this.time.now;
    if (now - this.lastShot < this.shotCooldownMs) return;
    this.lastShot = now;

    // Crea bala
    const bullet = this.add.rectangle(this.player.x + 18, this.player.y, 10, 4, 0xffd166);
    this.physics.add.existing(bullet);
    bullet.body.setAllowGravity(false);

    // Dirección hacia el mouse
    const pointer = this.input.activePointer;
    const dx = pointer.worldX - this.player.x;
    const dy = pointer.worldY - this.player.y;
    const dist = Math.hypot(dx, dy) || 1;

    const speed = 650;
    bullet.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);

    this.bullets.add(bullet);
  }

  damageEnemy(amount) {
    this.enemyHP = Math.max(0, this.enemyHP - amount);
    this.flash(this.enemy, 0xffffff, 80);
    this.updateUI();

    if (this.enemyHP === 0) {
      this.winSlice();
    }
  }

  damagePlayer(amount) {
    this.playerHP = Math.max(0, this.playerHP - amount);
    this.flash(this.player, 0xffffff, 80);
    this.updateUI();

    if (this.playerHP === 0) {
      this.loseSlice();
    }
  }

  flash(target, colorHex, ms) {
    if (!target) return;
    const original = target.fillColor;
    target.fillColor = colorHex;
    this.time.delayedCall(ms, () => {
      if (target && target.active) target.fillColor = original;
    });
  }

  winSlice() {
    this.gameOver = true;
    if (this.enemy && this.enemy.active) this.enemy.destroy();

    this.ui.status.setText("✅ SLICE COMPLETADO: Enemigo derrotado.");
    this.ui.status.setColor("#7CFF8A");
    this.ui.help.setText("Demo finalizada. Graba el video mostrando gameplay + código (game.js).");

    // Mini confeti (simple)
    for (let i = 0; i < 24; i++) {
      const p = this.add.circle(Phaser.Math.Between(200, W-200), Phaser.Math.Between(120, H-120), 3, Phaser.Math.Between(0, 0xffffff));
      this.tweens.add({
        targets: p,
        x: p.x + Phaser.Math.Between(-220, 220),
        y: p.y + Phaser.Math.Between(-160, 160),
        alpha: 0,
        duration: 700,
        onComplete: () => p.destroy()
      });
    }
  }

  loseSlice() {
    this.gameOver = true;
    this.ui.status.setText("❌ Fallaste: el enemigo te derrotó. Recarga la página para reintentar.");
    this.ui.status.setColor("#ff6b6b");
  }

  updateUI() {
    this.ui.hp.setText(`Player HP: ${this.playerHP}   |   Enemy HP: ${this.enemyHP}`);
    this.ui.status.setText("Objetivo: elimina al enemigo.");
    this.ui.status.setColor("#ffffff");
  }
}

const config = {
  type: Phaser.AUTO,
  width: W,
  height: H,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [MainScene]
};

new Phaser.Game(config);
