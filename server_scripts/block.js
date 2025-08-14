BlockEvents.broken(e => {
  const block = e.getBlock();
  if(block.id != global.FULL("magic_table")) return;
  const player = e.getPlayer();
  global.MAGIC_TABLE(e, "broken");
});