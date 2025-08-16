// 使用全局函数注册物品
StartupEvents.registry("item", e => {
	global.ITEM(e, "rainbow_dye");
	global.ITEM(e, "grayscale_dye");
	global.ITEM(e, "bleak_dye");
	global.ITEM(e, "soil_dye");
	
	global.ITEM(e, "magic_book", 1).maxDamage(1000);
	global.ITEM(e, "magic_paper", 1);
	
	global.ITEM(e, "magic_crystal");
});