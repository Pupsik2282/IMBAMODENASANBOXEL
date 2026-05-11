elements.philosopher_stone = {
    color: ["#c9a87b", "#b8860b", "#d4af37"],
    behavior: behaviors.POWDER,
    category: "alchemy",
    state: "solid",
    density: 2700,
    tempHigh: 2000,
    stateHigh: "magma",
    reactions: {
        "lead": { elem1: "gold", chance: 0.15 },
        "iron": { elem1: "gold", chance: 0.08 },
        "mercury": { elem1: "gold", chance: 0.25 }
    }
};

elements.elixir_of_life = {
    color: ["#00fa9a", "#00ff7f", "#00ced1"],
    behavior: behaviors.LIQUID,
    category: "alchemy",
    state: "liquid",
    density: 1100,
    viscosity: 15,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: -10,
    stateLow: "ice",
    reactions: {
        "plant": { elem1: "tree", chance: 0.5 },
        "rotten_meat": { elem1: "meat", chance: 0.6 },
        "wheat_seed": { elem1: "wheat", chance: 0.4 }
    },
    tick: function(pixel) {
        const adjacentCells = [
            {x: pixel.x + 1, y: pixel.y},
            {x: pixel.x - 1, y: pixel.y},
            {x: pixel.x, y: pixel.y + 1},
            {x: pixel.x, y: pixel.y - 1}
        ];
        
        for (let cell of adjacentCells) {
            const targetPixel = getPixel(cell.x, cell.y);
            if (targetPixel && targetPixel.element === "dead_plant") {
                setPixel(cell.x, cell.y, "plant");
            }
        }
    }
};

elements.dust_of_awakening = {
    color: ["#ffffff", "#e8e8e8", "#d0d0d0"],
    behavior: behaviors.POWDER,
    category: "alchemy",
    state: "solid",
    density: 800,
    tempHigh: 250,
    stateHigh: "fire",
    reactions: {
        "sand": { elem1: "glass", chance: 0.3 },
        "clay": { elem1: "porcelain", chance: 0.4 },
        "water": { elem1: "soda", chance: 0.2 }
    },
    tick: function(pixel) {
        const below = getPixel(pixel.x, pixel.y + 1);
        if (below && (below.element === "iron" || below.element === "copper")) {
            if (Math.random() < 0.05) {
                createPixel("spark", pixel.x, pixel.y - 1);
            }
        }
    }
};

if (!categories.alchemy) {
    categories.alchemy = {
        name: "alchemy",
        colour: ["#9370db", "#8a2be2"],
        visible: 1
    };
}

if (!elements.alchemy_reactions) {
    reactions.alchemy = [
        { elem1: "philosopher_stone", elem2: "elixir_of_life", elem3: "dust_of_awakening", chance: 0.05 }
    ];
}

tools.collect = {
    name: "Make",
    run: function(pixel) {
        if (pixel && pixel.element) {
            console.log(`Собран элемент: ${pixel.element}`);
            deletePixel(pixel.x, pixel.y);
        }
    }
};

if (typeof modInfo === "undefined") {
    var modInfo = [];
}
modInfo.push({
    name: "Alchemy Expansion",
    author: "Sandboxels Modder",
    description: "OKAK BOMBOCLAT",
    version: "1.0.0"
});
