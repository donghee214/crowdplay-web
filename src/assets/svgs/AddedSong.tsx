import React from "react"

interface props {
    active: boolean
    isLarge: boolean
}

export default ({ active, isLarge }: props) => (
    <svg height="24" viewBox="0 0 24 24" width="24"
        className={`addedSong 
            ${active ? `addedSong--active` : ''} 
            ${isLarge ? `addedSong--large` : `addedSong--small`}
        `}>
        <g>
            {/* <rect fill="none" height="24" width="24" /> */}
        </g><g><g><g>
            <path d="M14,10H2v2h12V10z M14,6H2v2h12V6z M2,16h8v-2H2V16z M21.5,11.5L23,13l-6.99,7l-4.51-4.5L13,14l3.01,3L21.5,11.5z" />
        </g></g></g>
    </svg>
)