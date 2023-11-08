import { useEffect, useState } from "react"

const Contacts = ({ currentUser, contacts, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    useEffect(() => {
        if (currentUser) {
            const userName = currentUser.name
            setCurrentUserName(userName)
        }
    }, [currentUser])
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
    return (
        <>
            {currentUserName && (
                <div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`contact ${index === currentSelected ? "selected" : ""
                                        }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="userName">
                                        <p className='mb-0'>{contact.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default Contacts
