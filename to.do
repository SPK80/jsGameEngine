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
_render = ShiftedRender(this.pos, render)
}

objects
draw(){

objects.Forech(o.draw(_render))
}

interact(){

}

}
