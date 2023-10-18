// Creating a player factory 

export type Tplayer= 'you' | 'bot'

export interface IthisPlayer
{
    player:Tplayer
}

function Player(this:IthisPlayer,player:Tplayer){
    this.player=player

    const getPlayer=()=>{
        return this.player
    }

    return {getPlayer}
}