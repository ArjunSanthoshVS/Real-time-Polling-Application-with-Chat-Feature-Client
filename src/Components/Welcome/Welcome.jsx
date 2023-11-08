
const Welcome = ({ currentUser }) => {
    const name = currentUser.name
    return (
        <>
            <h1>
                Welcome, <span>{name}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </>
    )
}

export default Welcome
