ServerEvents.recipes(e => {
	global.RECIP(
		e,
		"shapeless",
		["minecraft:glowstone_dust"],
		global.GET_DYE("orange")
	);
	global.RECIP(e, "shapeless", ["minecraft:grass"], global.GET_DYE("green"));
	global.RECIP(
		e,
		"shapeless",
		["minecraft:wheat_seeds"],
		global.GET_DYE("lime")
	);
	global.RECIP(
		e,
		"shapeless",
		["minecraft:brown_mushroom"],
		global.GET_DYE("brown")
	);
	global.RECIP(
		e,
		"shapeless",
		["minecraft:redstone"],
		global.GET_DYE("red"),
		true
	);
	global.RECIP(
		e,
		"shapeless",
		["minecraft:spider_eye"],
		global.GET_DYE("red"),
		true
	);
	global.RECIP(e, "shapeless", ["minecraft:coal"], global.GET_DYE("black"));
	global.RECIP(e, "shapeless", ["minecraft:sugar"], global.GET_DYE("white"));
	global.RECIP(
		e,
		"shapeless",
		["minecraft:gunpowder"],
		global.GET_DYE("gray")
	);

	global.RECIP(
		e,
		"shapeless",
		[
			global.GET_DYE("red"),
			global.GET_DYE("orange"),
			global.GET_DYE("yellow"),
			global.GET_DYE("green"),
			global.GET_DYE("cyan"),
			global.GET_DYE("blue"),
			global.GET_DYE("purple")
		],
		global.FULL("rainbow_dye")
	);

	global.RECIP(
		e,
		"shapeless",
		[
			global.GET_DYE("black"),
			global.GET_DYE("gray"),
			global.GET_DYE("light_gray"),
			global.GET_DYE("white")
		],
		global.FULL("grayscale_dye")
	);
	global.RECIP(
		e,
		"shapeless",
		[
			global.GET_DYE("brown"),
			global.GET_DYE("lime"),
			global.GET_DYE("light_blue"),
			global.GET_DYE("magenta"),
			global.GET_DYE("pink"),
			global.FULL("soil_dye")
		],
		global.FULL("bleak_dye")
	);

	global.RECIP(
		e,
		"shapeless",
		["minecraft:dirt"],
		Item.of(global.FULL("soil_dye"), 4),
		true,
		"from_dirt_to_soil_dye"
	);
	global.RECIP(
		e,
		"shapeless",
		["minecraft:potato"],
		global.FULL("soil_dye"),
		true
	);
	global.RECIP(
		e,
		"shapeless",
		["minecraft:wheat"],
		global.FULL("soil_dye"),
		true
	);
	global.RECIP(
		e,
		"shapeless",
		[global.FULL("soil_dye"), global.GET_DYE("white")],
		global.GET_DYE("yellow")
	);

	global.RECIP(
		e,
		"shaped",
		[
			[
				global.FULL("rainbow_dye"),
				global.FULL("bleak_dye"),
				global.FULL("grayscale_dye")
			],
			["minecraft:redstone", "minecraft:book", "minecraft:redstone"],
			[
				"minecraft:sugar",
				"minecraft:glowstone_dust",
				"minecraft:gunpowder"
			]
		],
		Item.of(global.FULL("magic_book"), {
			attrs: [],
			attr: {}
		}),
		true,
		"magic_book"
	);

	global
		.RECIP(
			e,
			"shapeless",
			[
				global.FULL("magic_crystal"),
				Item.of(global.FULL("magic_paper")),
				global.GET_DYE("white")
			],
			Item.of(global.FULL("magic_paper")),
			true,
			"wash_magic_paper"
		)
		.modifyResult((inputs, result) => {
			let lv = inputs.find(global.FULL("magic_paper")).nbt?.level || 1;
			result = Item.of(global.FULL("magic_paper"), {
				level: lv,
				attr: "#FFFFFF"
			});
			return result;
		});
	global.RECIP(
		e,
		"shaped",
		[
			["", global.FULL("magic_book"), ""],
			[
				global.FULL("magic_crystal"),
				"minecraft:crying_obsidian",
				global.FULL("magic_crystal")
			],
			[
				"minecraft:crying_obsidian",
				"minecraft:crying_obsidian",
				"minecraft:crying_obsidian"
			]
		],
		global.FULL("magic_table")
	);

	global.RECIP(
		e,
		"shapeless",
		["minecraft:tnt", "minecraft:obsidian"],
		"minecraft:crying_obsidian"
	);

	global.RECIP(
		e,
		"smelting",
		global.FULL("magic_crystal_ore"),
		global.FULL("magic_crystal"),
		50,
		20 * 3
	);
});
