// priority: 1000

global.MAX_ATTRS = 12;
global.PROG_LENGTH = 18;
global.ALL_ITEMS = [];

function BASIC(zero) {
	if (!zero) {
		this.cost = 0.9;
		this.atk = 3;
		this.hp = 3;
		this.br = 0.2;
		this.bd = 1.5;
	} else {
		this.cost = 0;
		this.atk = 0;
		this.hp = 0;
		this.br = 0;
		this.bd = 0;
	}

	return this;
}

function ATTR() {
	this.brightness = 0;
	this.darkness = 0;
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.level = 0;
	this.color = "";
	return this;
}

global.MOD_ID = "colorist";

global.FULL = id => {
	return global.MOD_ID + ":" + id;
};

global.RECIP = (e, type, from, to, id, ufn) => {
	if (id) {
		let fn = from;
		if(type == "smelting") return e[type](to, from, id, ufn).id(global.FULL(`from_${global.FOMMAT(from)}_to_${global.FOMMAT(to)}`));
		while (Array.isArray(fn)) {
			fn = fn[0];
		}
		return e[type](to, from).id(
			global.FULL(
				ufn || `from_${global.FOMMAT(fn)}_to_${global.FOMMAT(to)}`
			)
		);
	}
	return e[type](to, from).id(global.FULL(global.FOMMAT(to)));
};

global.FOMMAT = id => {
	if (typeof id == "object" && id.toString().match(/^\"/)) {
		return id.toString().replace('"', "");
	} else if (id.match(/^(minecraft\:)/)) {
		return id.replace("minecraft:", "");
	} else if (id.match(new RegExp(`^${global.MOD_ID}:`))) {
		return id.replace(`${global.MOD_ID}:`, "");
	}
	return id;
};

global.KEEP = (n, m) => {
	return Number(n.toFixed(m || 1));
};

global.GET_DYE = id => {
	return `minecraft:${id}_dye`;
};

global.ITEM = (e, id, maxStack, type) => {
  global.ALL_ITEMS.push(global.FULL(id));
	return e
		.create(global.FULL(id), type || "basic")
		.maxStackSize(maxStack || 64);
};

global.BLOCK = (e, id, type) => {
  global.ALL_ITEMS.push(global.FULL(id));
	return e.create(global.FULL(id), type || "basic");
};

global.FLOAT_ITEM = (world, item, block) => {
	const { x, y, z } = block.pos;
	const iteme = world.createEntity("item");
	iteme.setPos(x + 0.5, y + 1, z + 0.5);
	iteme.item = item.copy();
	iteme.age = -32768;
	iteme.setPickUpDelay(-1);
	iteme.setNoGravity(true);
	iteme.item.count = 1;
	iteme.spawn();
	block.setEntityData({ data: { item: item.id, nbt: item.nbt } });
};

global.FIND_FLOAT_ITEM = (world, block) => {
	const { x, y, z } = block.pos;
	const aabb = AABB.of(x, y, z, x + 1, y + 2, z + 1);
	const entities = world.getEntitiesWithin(aabb);
	for (let e of entities) {
		if (e.item.id == block.getEntityData().get("data").get("item")) {
			return e;
		}
	}
	return null;
};

global.COLOR = {
	white_dye: "#F9FFFE", // 白色染料
	orange_dye: "#F9801D", // 橙色染料
	magenta_dye: "#C74EBD", // 品红色染料
	light_blue_dye: "#3AB3DA", // 淡蓝色染料
	yellow_dye: "#FED83D", // 黄色染料
	lime_dye: "#80C71F", // 黄绿色染料
	pink_dye: "#F38BAA", // 粉红色染料
	gray_dye: "#474F52", // 灰色染料
	light_gray_dye: "#9D9D97", // 淡灰色染料
	cyan_dye: "#169C9C", // 青色染料
	purple_dye: "#8932B8", // 紫色染料
	blue_dye: "#3C44AA", // 蓝色染料
	brown_dye: "#835432", // 棕色染料
	green_dye: "#5E7C16", // 绿色染料
	red_dye: "#B02E26", // 红色染料
	black_dye: "#1D1D21", // 黑色染料
	soil_dye: "#8B7E6B" //土
};

global.HEX_TO_RGB = hex => {
	// 提取RGB分量
	const r = parseInt(hex.substring(1, 3), 16);
	const g = parseInt(hex.substring(3, 5), 16);
	const b = parseInt(hex.substring(5, 7), 16);
	return {
		r: r,
		g: g,
		b: b
	};
};

global.MERGE_COLOR = (c1, c2, ratio) => {
	ratio = ratio || 0.5;
	c1 = c1 || "#FFFFFF";
	c2 = c2 || "#FFFFFF";
	// 提取RGB分量
	const rgb1 = global.HEX_TO_RGB(c1);
	const rgb2 = global.HEX_TO_RGB(c2);

	const r1 = rgb1.r;
	const g1 = rgb1.g;
	const b1 = rgb1.b;

	const r2 = rgb2.r;
	const g2 = rgb2.g;
	const b2 = rgb2.b;

	// 计算混合值
	const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
	const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
	const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
	// 转换回十六进制
	return `#${r.toString(16).padStart(2, "0")}${g
		.toString(16)
		.padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

global.GRADIENT_TEXT = (text, startColor, endColor) => {
	let result = Text.of("");

	for (let i = 0; i < text.length; i++) {
		const ratio = i / (text.length - 1);
		const charColor = global.MERGE_COLOR(startColor, endColor, ratio);
		result = result.append(global.COLOR_TEXT(text[i], charColor));
	}

	return result;
};

global.REMOVE_ITEM = (item, num) => {
	item.count -= num || 1;
};

global.CALC_ATTR = nbt => {
	const color = nbt.attr;
	const attrs = new ATTR();
	attrs.level = nbt.level;
	attrs.color = nbt.attr;
	const rgb = global.HEX_TO_RGB(color);
	for (let key in rgb) {
		attrs.brightness += rgb[key] / 255 / 3;
		attrs[key] = Math.round((rgb[key] / 255) * 10);
	}
	attrs.brightness = Math.round(attrs.brightness * 10);
	attrs.darkness = 10 - attrs.brightness;
	return attrs;
};

global.CALC_ATTRS = attrs => {
	const l = attrs.length;
	const r = new ATTR();
	attrs.forEach(attr => {
		for (let key in attr) {
			if (typeof attr[key] == "number") {
				r[key] += attr[key];
			}
		}
	});
	r.color = global.RGB_T0_HEX({
		r: Math.round((r.r / l / 10) * 255),
		g: Math.round((r.g / l / 10) * 255),
		b: Math.round((r.b / l / 10) * 255)
	});
	return r;
};

global.RGB_T0_HEX = rgb => {
	const { r, g, b } = rgb;

	// 检查是否在有效范围内
	if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
		throw new Error("RGB values must be between 0 and 255");
	}

	// 转换为十六进制
	const hex = `#${r.toString(16).padStart(2, "0")}${g
		.toString(16)
		.padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
	return hex;
};

global.PROG = obj => {
	let r = Text.of("");
	let sum = 0;
	for (let key in obj) {
		sum += obj[key];
	}
	for (let key in obj) {
		r.append(
			global.NC_TO_TEXT(
				Math.round((obj[key] / sum) * global.PROG_LENGTH),
				key
			)
		);
	}
	return r;
};

global.NC_TO_TEXT = (n, c) => {
	return Text.of("▍".repeat(n)).color(c);
};

global.ATTR_SHOW = (e, text, attr, ext) => {
	if(!attr) return "";
	text.add(
		Text.gold("虹彩: ").append(
			global.PROG({
				red: attr.r,
				green: attr.g,
				blue: attr.b
			})
		)
	);
	text.add(
		Text.gray("阴阳: ").append(
			global.PROG({
				white: attr.brightness,
				dark_gray: attr.darkness
			})
		)
	);
	if (e.shift) {
		text.add("");
		text.add(Text.red("朱赤: ").append(attr.r));
		text.add(Text.green("碧青: ").append(attr.g));
		text.add(Text.blue("苍蓝: ").append(attr.b));
		text.add(Text.darkGray("阴: ").append(attr.darkness));
		text.add(Text.white("阳: ").append(attr.brightness));
		const res = global.VALUE_COUNTER(attr, !ext);
		text.add("");
		text.add(Text.blue("消耗: ").append(global.ADD_ADD(res.cost, !ext)));
		text.add(Text.red("攻击: ").append(global.ADD_ADD(res.atk, !ext)));
		text.add(Text.green("生命: ").append(global.ADD_ADD(res.hp, !ext)));
		text.add(
			Text.darkAqua("暴击率: ").append(global.ADD_ADD(res.br, !ext))
		);
		text.add(
			Text.darkPurple("暴击伤害: ").append(global.ADD_ADD(res.bd, !ext))
		);

		text.add("");
		if (ext) text.add(ext);
	} else {
		text.add(Text.darkGray("按住shift查看详情"));
	}
};

global.VALUE_COUNTER = (attr, zero) => {
	const { r, g, b, brightness, darkness, level } = attr;
	let res = new BASIC(zero);

	// 使用 ATTR_ADDER 来修改 res 的属性
	global.ATTR_ADDER(res, "cost", -b / 150);
	global.ATTR_ADDER(res, "atk", Math.pow(r, 1.1) / 10 + Math.pow(level, 0.8) / 5);
	global.ATTR_ADDER(res, "hp", Math.pow(g, 1.1) / 5 + Math.pow(level, 0.8) / 5);
	global.ATTR_ADDER(res, "br", (Math.sqrt(brightness) * 2.5) / 100, 2);
	global.ATTR_ADDER(res, "bd", darkness / 100);
	return res;
};

global.copy = obj => {
	return JSON.parse(JSON.stringify(obj));
};

global.ATTR_ADDER = (o, k, v, p) => {
	o[k] = global.KEEP(o[k] + v, p);
};

global.ADD_ADD = (v, t) => {
	if (v > 0 && t) return "+" + v;
	return v;
};
