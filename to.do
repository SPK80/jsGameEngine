Engine{
start(){}
stop(){}
onUpdate
}

RenderEngine extends Engine{
render
}

Scene{
Constructor(onRender, onPhisics, on...){
onRender.listen(this.draw)
onPhisics.listen(this.interact)
}

objects
draw(render){
_render = ShiftedRender(this.pos, render)
objects.Forech(o.draw(_render))
}
interact(phisics){

}

}
