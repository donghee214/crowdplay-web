import React, { useEffect, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import db from "server/Firestore"
import Loading from "shared/components/Loading"
import { Room, Song } from "shared/types"
import Back from "assets/svgs/Back"
import Share from "assets/svgs/Share"

interface CurrentlyPlayingProps {
    roomName?: string
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({ roomName }) => {
    const [song, setSong] = useState<Song | undefined>()
    const [vibrantColour, setVibrantColour] = useState<number[]>([255, 255, 255])


    useEffect(() => {
        const unsub = db.firestore().doc(`rooms/${roomName}`).onSnapshot((doc) => {
            const room = doc.data() as Room
            setSong(room.currentSong)
            setVibrantColour(room.vibrantColour)
        })
        return () => unsub()
    }, [])

    const renderSong = () => {
        if (!song) {
            return <Loading />
        }
        return (
            <React.Fragment>
                <div className="votingRoom-background" style={{
                    backgroundColor: `rgba(${vibrantColour[0]}, ${vibrantColour[1]}, ${vibrantColour[2]}, 0.8)`
                }} />
                <div className="votingRoom-background-opacityLayer" />
                <div className="votingroom_currentlyPlaying-albumCover"
                    style={{
                        backgroundImage: `url(${song.song.album.images[0].url})`
                    }}
                />
                <div className="votingroom_currentlyPlaying-titleContainer">
                    <h2 style={{ color: `rgb(${vibrantColour[0]}, ${vibrantColour[1]}, ${vibrantColour[2]})` }}>
                        {song.song.name}
                    </h2>
                    <h4 style={{ marginTop: '4px' }}>
                        {song.song.artists[0].name}
                    </h4>
                </div>
            </React.Fragment>
        )
    }


    return (
        <div className="votingroom_currentlyPlaying-container">
            <div className="votingroom_currentlyPlaying-roomInfo_container">
                <Back />
                <div>
                    <h4 className="votingroom_currentlyPlaying-roomLabel">
                        Roomname:
                    </h4>
                    <h2 className="votingroom_currentlyPlaying-roomName" >
                        {roomName}
                    </h2>
                </div>
                <Share />
            </div>
            {renderSong()}
        </div>
    )
}

export default React.memo(CurrentlyPlaying)