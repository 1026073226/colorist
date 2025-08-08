ServerEvents.recipes((e) => {
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
	global.RECIP(e, "shapeless", ["minecraft:redstone"], global.GET_DYE("red"));
	global.RECIP(e, "shapeless", ["minecraft:coal"], global.GET_DYE("black"));

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
			global.GET_DYE("purple"),
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
			global.GET_DYE("white"),
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
			global.FULL("soil_dye"),
		],
		global.FULL("bleak_dye")
	);

	global.RECIP(
		e,
		"shapeless",
		["minecraft:dirt"],
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
});
