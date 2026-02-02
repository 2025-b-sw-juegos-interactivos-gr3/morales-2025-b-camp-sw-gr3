// Neon Corridor: Vertical Slice (Phaser 3)
// Con texturas (assets) en src/assets/
// Requisitos de archivos:
// - src/assets/bg_corridor.jpg
// - src/assets/player_ship.jpg
// - src/assets/enemy_bot.jpg
// - src/assets/bullet.jpg
// - src/assets/bar_top.jpg
// - src/assets/bar_bottom.jpg

const W = 960;
const H = 540;

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
    this._lastContact = 0;

    this.topBar = null;
    this.bottomBar = null;

    this.ui = null;
    this.keys = null;
  }

  preload() {
    // Carga de imágenes (JPG) desde src/assets/
    this.load.image("bg", "src/assets/bg_corridor.jpg");
    this.load.image("player", "src/assets/player_ship.jpg");
    this.load.image("enemy", "src/assets/enemy_bot.jpg");
    this.load.image("bullet", "src/assets/bullet.jpg");
    this.load.image("barTop", "src/assets/bar_top.jpg");
    this.load.image("barBottom", "src/assets/bar_bottom.jpg");
  }

  create() {
    // Fondo (si tu imagen no es 960x540, Phaser la escala)
    const bg = this.add.image(W / 2, H / 2, "bg");
    bg.setDisplaySize(W, H);

    // Barras superiores/inferiores (decoración + colisión)
    // Si tus texturas no “cuadran”, ajusta setDisplaySize(...) a tu gusto.
    this.topBar = this.physics.add.staticImage(W / 2, 60, "barTop");
    this.topBar.setDisplaySize(W, 24);
    this.topBar.refreshBody();

    this.bottomBar = this.physics.add.staticImage(W / 2, H - 60, "barBottom");
    this.bottomBar.setDisplaySize(W, 24);
    this.bottomBar.refreshBody();

    // Player (sprite con física)
    this.player = this.physics.add.sprite(140, H / 2, "player");
    this.player.setDisplaySize(44, 44); // tamaño visible
    this.player.setCollideWorldBounds(true);

    // Enemy (sprite con física)
    this.enemy = this.physics.add.sprite(W - 160, H / 2, "enemy");
    this.enemy.setDisplaySize(50, 50);
    this.enemy.setCollideWorldBounds(true);

    // Colisiones con barras
    this.physics.add.collider(this.player, this.topBar);
    this.physics.add.collider(this.player, this.bottomBar);
    this.physics.add.collider(this.enemy, this.topBar);
    this.physics.add.collider(this.enemy, this.bottomBar);

    // Grupo de balas
    this.bullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      runChildUpdate: false
    });

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

    // Disparo mouse + espacio
    this.input.on("pointerdown", () => this.tryShoot());
    this.input.keyboard.on("keydown-SPACE", () => this.tryShoot());

    // Overlap bala -> enemigo
    this.physics.add.overlap(this.bullets, this.enemy, (bullet, enemy) => {
      bullet.destroy();
      this.damageEnemy(1);
    });

    // UI
    this.ui = {
      title: this.add.text(16, 12, "Neon Corridor: Vertical Slice", { fontSize: "18px", color: "#ffffff" }),
      help: this.add.text(16, 36, "WASD/Flechas mover | Click/Espacio disparar | Objetivo: derrotar enemigo", { fontSize: "14px", color: "#cfd6e6" }),
      hp: this.add.text(16, 62, "", { fontSize: "14px", color: "#ffffff" }),
      status: this.add.text(16, 86, "", { fontSize: "16px", color: "#ffffff" })
    };

    this.updateUI();

    // Mundo
    this.physics.world.setBounds(0, 0, W, H);
  }

  update(time, delta) {
    if (this.gameOver) return;

    this.updatePlayerMovement();
    this.updateEnemyAI();

    // Limpiar balas fuera de pantalla
    this.bullets.children.each((b) => {
      if (!b.active) return;
      if (b.x < -50 || b.x > W + 50 || b.y < -50 || b.y > H + 50) {
        b.destroy();
      }
    });
  }

  updatePlayerMovement() {
    const speed = 260;

    const left = this.keys.left.isDown || this.keys.left2.isDown;
    const right = this.keys.right.isDown || this.keys.right2.isDown;
    const up = this.keys.up.isDown || this.keys.up2.isDown;
    const down = this.keys.down.isDown || this.keys.down2.isDown;

    let vx = 0, vy = 0;
    if (left) vx -= 1;
    if (right) vx += 1;
    if (up) vy -= 1;
    if (down) vy += 1;

    // Normaliza diagonal
    const len = Math.hypot(vx, vy) || 1;
    vx = (vx / len) * speed;
    vy = (vy / len) * speed;

    this.player.setVelocity(vx, vy);

    // (Opcional) “mirar” hacia el mouse
    const pointer = this.input.activePointer;
    this.player.setFlipX(pointer.worldX < this.player.x);

    // Mantener en pasillo (por si tus barras son solo decorativas)
    this.player.y = clamp(this.player.y, 90, H - 90);
  }

  updateEnemyAI() {
    if (!this.enemy || !this.enemy.active) return;

    const speed = 140;
    const dx = this.player.x - this.enemy.x;
    const dy = this.player.y - this.enemy.y;
    const dist = Math.hypot(dx, dy);

    const stopDist = 55;

    if (dist > stopDist) {
      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;
      this.enemy.setVelocity(vx, vy);
    } else {
      this.enemy.setVelocity(0, 0);
      this.tryContactDamage();
    }

    // mirar hacia el player
    this.enemy.setFlipX(this.player.x < this.enemy.x);

    this.enemy.y = clamp(this.enemy.y, 90, H - 90);
  }

  tryContactDamage() {
    const now = this.time.now;
    if (now - this._lastContact < 700) return;
    this._lastContact = now;
    this.damagePlayer(1);
  }

  tryShoot() {
    const now = this.time.now;
    if (now - this.lastShot < this.shotCooldownMs) return;
    this.lastShot = now;

    const pointer = this.input.activePointer;

    const dx = pointer.worldX - this.player.x;
    const dy = pointer.worldY - this.player.y;
    const dist = Math.hypot(dx, dy) || 1;

    const speed = 650;

    // Crear bala como Image con física
    const bullet = this.physics.add.image(this.player.x, this.player.y, "bullet");
    bullet.setDisplaySize(18, 8);
    bullet.setAllowGravity(false);

    // Dirección + velocidad
    bullet.setVelocity((dx / dist) * speed, (dy / dist) * speed);

    // Rotación para “apuntar” (si tu bullet se ve raro, comenta esta línea)
    bullet.setRotation(Math.atan2(dy, dx));

    // Agregar a grupo
    this.bullets.add(bullet);
  }

  damageEnemy(amount) {
    this.enemyHP = Math.max(0, this.enemyHP - amount);
    this.flashTint(this.enemy, 0xffffff, 80);
    this.updateUI();

    if (this.enemyHP === 0) {
      this.winSlice();
    }
  }

  damagePlayer(amount) {
    this.playerHP = Math.max(0, this.playerHP - amount);
    this.flashTint(this.player, 0xffffff, 80);
    this.updateUI();

    if (this.playerHP === 0) {
      this.loseSlice();
    }
  }

  flashTint(target, tintColor, ms) {
    if (!target) return;
    target.setTint(tintColor);
    this.time.delayedCall(ms, () => {
      if (target && target.active) target.clearTint();
    });
  }

  winSlice() {
    this.gameOver = true;
    if (this.enemy && this.enemy.active) this.enemy.destroy();

    this.ui.status.setText("✅ SLICE COMPLETADO: Enemigo derrotado.");
    this.ui.status.setColor("#7CFF8A");
    this.ui.help.setText("Demo lista para grabar: muestra gameplay + el archivo src/js/game.js");

    // Efecto simple (partículas con círculos)
    for (let i = 0; i < 28; i++) {
      const p = this.add.circle(
        Phaser.Math.Between(200, W - 200),
        Phaser.Math.Between(120, H - 120),
        3,
        Phaser.Math.Between(0, 0xffffff)
      );
      this.tweens.add({
        targets: p,
        x: p.x + Phaser.Math.Between(-240, 240),
        y: p.y + Phaser.Math.Between(-170, 170),
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
    arcade: { debug: false }
  },
  scene: [MainScene]
};

new Phaser.Game(config);
