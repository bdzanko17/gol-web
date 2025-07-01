# Game of Life - Web Implementation

A modern, interactive web implementation of the Game of Life with a beautiful dark theme and smooth animations.

## 🎮 Features

- **Interactive Grid**: Click on cells to toggle them alive/dead
- **Real-time Animation**: Watch the evolution unfold with adjustable speed
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Dark theme with glowing effects and smooth animations
- **Multiple Controls**:
  - Play/Pause simulation
  - Step through generations manually
  - Clear the grid
  - Generate random patterns
  - Adjust grid size (20x20 to 80x80)
  - Control animation speed
- **Keyboard Shortcuts**:
  - `Spacebar`: Play/Pause
  - `S`: Step
  - `C`: Clear
  - `R`: Random
- **Statistics**: Live generation count and cell population

## 🚀 Demo

Visit the live demo at: `https://yourusername.github.io/gol-web`

## 🛠️ Setup for GitHub Pages

1. **Upload to GitHub**:
   ```bash
   git add .
   git commit -m "Add Game of Life implementation"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Select "Source: Deploy from a branch"
   - Choose "Branch: main" and "/ (root)"
   - Save the settings

3. **Access your site**:
   - Your site will be available at `https://yourusername.github.io/gol-web`
   - It may take a few minutes to become active

## 📁 Project Structure

```
gol-web/
├── index.html      # Main HTML structure
├── style.css       # Modern styling and animations
├── script.js       # Game logic and interactions
└── README.md       # Project documentation
```

## 🎯 How to Play

1. **Starting the Game**:
   - Click on grid cells to create your initial pattern
   - Use the "Random" button to generate a random starting configuration
   - Press "Play" to begin the simulation

2. **Controls**:
   - **Play/Pause**: Start or stop the animation
   - **Step**: Advance one generation at a time
   - **Clear**: Reset the grid to empty
   - **Random**: Fill the grid with a random pattern
   - **Speed Slider**: Adjust how fast generations advance
   - **Grid Size**: Change the grid dimensions

3. **Game Rules**:
   - Any live cell with 2-3 neighbors survives
   - Any dead cell with exactly 3 neighbors becomes alive
   - All other cells die or remain dead

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
/* Primary color (currently green) */
color: #00ff88;
background: linear-gradient(45deg, #00ff88, #00cc6a);
```

### Adding New Patterns
Add patterns to the `patterns` object in `script.js`:
```javascript
const patterns = {
    myPattern: [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]
    ]
};
```

### Adjusting Grid Settings
Modify default values in the `GameOfLife` constructor:
```javascript
this.cellSize = 12;    // Size of each cell in pixels
this.gridSize = 40;    // Default grid dimensions
this.speed = 10;       // Default animation speed
```

## 🌟 Notable Patterns

The implementation includes several classic Game of Life patterns:
- **Glider**: A simple moving pattern
- **Blinker**: Oscillates between two states
- **Block**: A stable, unchanging pattern
- **Beacon**: A period-2 oscillator

## 🖥️ Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Requires HTML5 Canvas support.

## 📱 Mobile Support

The website is fully responsive and works on mobile devices with touch interaction for toggling cells.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source and available under the MIT License.

## 🔗 About the Game of Life

The Game of Life is a cellular automaton that demonstrates how complex patterns can emerge from simple rules. Despite being called a "game," it requires no human input after the initial configuration.

Learn more: [Wikipedia - Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
