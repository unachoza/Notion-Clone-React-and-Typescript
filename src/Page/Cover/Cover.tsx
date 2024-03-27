import { ChangeEventHandler, useRef } from 'react'
import styles from './Cover.module.css'

const Cover = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onChangeCoverImage = () => {
        fileInputRef.current?.click()
    }

    const onCoverImageUpload:ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.target
        console.log(target?.files?.[0])
    }

    return (
        <div className={styles.cover}>
            <img src="/Screenshot.png" alt="cover"/>
            <button className={styles.button} onClick={onChangeCoverImage}>
                Change cover
            </button>
            <input
                ref={fileInputRef}
                style={{display: "none"}}
                onChange={onCoverImageUpload}
                type="file"
            />
        </div>
    )
}

export default Cover