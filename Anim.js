class Anim {
	constructor() {
		this.frames = [".(^-^)'","-(^-^)-","'(^-^).","-(^o^)-",".(^-^)'","-(^-^)-","'(^-^).","-(^-^)-"];
		this.currentFrame = 0;
		this.interval = null;
	}
	
	start() {
		this.interval = setInterval( () => {
			process.stdout.write( this.frames[ this.currentFrame ] + '\x1b[7D' );
			if ( this.currentFrame == this.frames.length - 1 ) {
				this.currentFrame = 0;
			} else {
				this.currentFrame++;
			}
		}, 250 );
	}

	stop() {
		clearInterval( this.interval );
	}
};

module.exports = Anim;