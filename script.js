class GameOfLife {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 12;
        this.gridSize = 40;
        this.isPlaying = false;
        this.generation = 0;
        this.speed = 10;
        this.animationId = null;
        this.lastUpdate = 0;
        
        this.initializeGrid();
        this.setupCanvas();
        this.setupEventListeners();
        this.updateDisplay();
        this.render();
    }

    initializeGrid() {
        this.grid = [];
        this.nextGrid = [];
        
        for (let i = 0; i < this.gridSize; i++) {
            this.grid[i] = [];
            this.nextGrid[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                this.grid[i][j] = false;
                this.nextGrid[i][j] = false;
            }
        }
    }

    setupCanvas() {
        const size = this.gridSize * this.cellSize;
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.width = `${Math.min(size, 600)}px`;
        this.canvas.style.height = `${Math.min(size, 600)}px`;
    }

    setupEventListeners() {
        // Play/Pause button
        const playPauseBtn = document.getElementById('playPauseBtn');
        playPauseBtn.addEventListener('click', () => this.togglePlayPause());

        // Step button
        const stepBtn = document.getElementById('stepBtn');
        stepBtn.addEventListener('click', () => this.step());

        // Clear button
        const clearBtn = document.getElementById('clearBtn');
        clearBtn.addEventListener('click', () => this.clear());

        // Random button
        const randomBtn = document.getElementById('randomBtn');
        randomBtn.addEventListener('click', () => this.randomize());

        // Speed slider
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');
        speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            speedValue.textContent = this.speed;
        });

        // Size slider
        const sizeSlider = document.getElementById('sizeSlider');
        const sizeValue = document.getElementById('sizeValue');
        sizeSlider.addEventListener('input', (e) => {
            this.gridSize = parseInt(e.target.value);
            sizeValue.textContent = this.gridSize;
            this.initializeGrid();
            this.setupCanvas();
            this.generation = 0;
            this.updateDisplay();
            this.render();
        });

        // Canvas click
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'KeyS':
                    e.preventDefault();
                    this.step();
                    break;
                case 'KeyC':
                    e.preventDefault();
                    this.clear();
                    break;
                case 'KeyR':
                    e.preventDefault();
                    this.randomize();
                    break;
            }
        });
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = Math.floor((e.clientX - rect.left) * scaleX / this.cellSize);
        const y = Math.floor((e.clientY - rect.top) * scaleY / this.cellSize);
        
        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
            this.grid[y][x] = !this.grid[y][x];
            this.updateDisplay();
            this.render();
        }
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('playPauseBtn');
        btn.textContent = this.isPlaying ? 'Pause' : 'Play';
        
        if (this.isPlaying) {
            this.animate();
        } else {
            cancelAnimationFrame(this.animationId);
        }
    }

    step() {
        this.updateGeneration();
        this.generation++;
        this.updateDisplay();
        this.render();
    }

    clear() {
        this.isPlaying = false;
        cancelAnimationFrame(this.animationId);
        document.getElementById('playPauseBtn').textContent = 'Play';
        
        this.initializeGrid();
        this.generation = 0;
        this.updateDisplay();
        this.render();
    }

    randomize() {
        this.isPlaying = false;
        cancelAnimationFrame(this.animationId);
        document.getElementById('playPauseBtn').textContent = 'Play';
        
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.grid[i][j] = Math.random() < 0.3;
            }
        }
        
        this.generation = 0;
        this.updateDisplay();
        this.render();
    }

    animate(currentTime = 0) {
        if (!this.isPlaying) return;

        const deltaTime = currentTime - this.lastUpdate;
        const interval = 1000 / this.speed;

        if (deltaTime >= interval) {
            this.step();
            this.lastUpdate = currentTime;
        }

        this.animationId = requestAnimationFrame((time) => this.animate(time));
    }

    updateGeneration() {
        // Clear next grid
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.nextGrid[i][j] = false;
            }
        }

        // Apply Game of Life rules
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const neighbors = this.countNeighbors(i, j);
                const isAlive = this.grid[i][j];

                if (isAlive) {
                    // Live cell with 2 or 3 neighbors survives
                    this.nextGrid[i][j] = neighbors === 2 || neighbors === 3;
                } else {
                    // Dead cell with exactly 3 neighbors becomes alive
                    this.nextGrid[i][j] = neighbors === 3;
                }
            }
        }

        // Swap grids
        [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                
                const newRow = row + i;
                const newCol = col + j;
                
                if (newRow >= 0 && newRow < this.gridSize && 
                    newCol >= 0 && newCol < this.gridSize) {
                    if (this.grid[newRow][newCol]) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    countLivingCells() {
        let count = 0;
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j]) count++;
            }
        }
        return count;
    }

    updateDisplay() {
        document.getElementById('generation').textContent = this.generation;
        document.getElementById('livingCells').textContent = this.countLivingCells();
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines
        this.ctx.strokeStyle = '#1a1a1a';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.gridSize; i++) {
            const pos = i * this.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(pos, 0);
            this.ctx.lineTo(pos, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, pos);
            this.ctx.lineTo(this.canvas.width, pos);
            this.ctx.stroke();
        }

        // Draw living cells
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j]) {
                    this.drawCell(j, i);
                }
            }
        }
    }

    drawCell(x, y) {
        const cellX = x * this.cellSize;
        const cellY = y * this.cellSize;
        
        // Main cell body
        this.ctx.fillStyle = '#00ff88';
        this.ctx.fillRect(cellX + 1, cellY + 1, this.cellSize - 2, this.cellSize - 2);
        
        // Glow effect
        const gradient = this.ctx.createRadialGradient(
            cellX + this.cellSize / 2, cellY + this.cellSize / 2, 0,
            cellX + this.cellSize / 2, cellY + this.cellSize / 2, this.cellSize / 2
        );
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0.2)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(cellX + 1, cellY + 1, this.cellSize - 2, this.cellSize - 2);
    }

    // Preset patterns
    loadPattern(pattern, startX = 0, startY = 0) {
        this.clear();
        
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                const x = startX + j;
                const y = startY + i;
                if (x < this.gridSize && y < this.gridSize && pattern[i][j] === 1) {
                    this.grid[y][x] = true;
                }
            }
        }
        
        this.updateDisplay();
        this.render();
    }
}

// Preset patterns
const patterns = {
    glider: [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ],
    
    blinker: [
        [1, 1, 1]
    ],
    
    block: [
        [1, 1],
        [1, 1]
    ],
    
    beacon: [
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 1]
    ]
};

// Initialize the game when the page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new GameOfLife();
    
    // Add some initial patterns for demonstration
    setTimeout(() => {
        game.loadPattern(patterns.glider, 5, 5);
        game.loadPattern(patterns.beacon, 15, 10);
        game.loadPattern(patterns.blinker, 25, 15);
    }, 500);
});

// Expose patterns for potential future use
window.gamePatterns = patterns; 