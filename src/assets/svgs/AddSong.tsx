import React, { useEffect, useState } from "react"

interface props {
    className?: string,
}

export default ({ className }: props) => (
    <svg className={`addSong ${className}`} height="24" viewBox="0 0 24 24" width="24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
)
