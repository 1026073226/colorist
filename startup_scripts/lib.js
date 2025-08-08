// priority: 1000
global.MOD_ID = "colorist";

global.FULL = (id) => {
	return global.MOD_ID + ":" + id;
};

global.RECIP = (e, type, from, to, id) => {
	if (id) {
		let fn = from;
		while (Array.isArray(fn)) {
			fn = fn[0];
		}
		return e[type](to, from).id(
			global.FULL(`from_${global.FOMMAT(fn)}_to_${global.FOMMAT(to)}`)
		);
	}
	return e[type](to, from).id(global.FULL(global.FOMMAT(to)));
};

global.FOMMAT = (id) => {
	if (id.match(/^(minecraft\:)/)) {
		return id.replace("minecraft:", "");
	} else if (id.match(new RegExp(`^${global.MOD_ID}:`))) {
		return id.replace(`${global.MOD_ID}:`, "");
	}
	return id;
};

global.GET_DYE = (id) => {
	return `minecraft:${id}_dye`;
};

global.ITEM = (e, id, maxStack) => {
	return e.create(global.FULL(id), "basic").maxStackSize(maxStack || 64);
};
