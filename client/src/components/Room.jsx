import React from 'react'

const Room = ({ username, room, setUsername, setRoom, setChatScreen, socket }) => {
    const sendRoom = () => {
        if (!username.trim() || !room.trim()) return;
        socket.emit("room", room)
        setChatScreen(true)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendRoom();
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white p-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8'>
                <h1 className='text-center font-bold mb-8 text-3xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-transparent bg-clip-text'>
                    WELCOME TO CHAT
                </h1>

                <div className='space-y-6'>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Kullanıcı Adı
                        </label>
                        <input
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            type="text"
                            placeholder='Kullanıcı adınızı girin'
                            className='w-full h-12 px-4 rounded-xl outline-none border border-gray-300 
                                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                                     transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-2">
                            Oda
                        </label>
                        <input
                            id="room"
                            value={room}
                            onChange={e => setRoom(e.target.value)}
                            onKeyPress={handleKeyPress}
                            type="text"
                            placeholder='Oda adını girin'
                            className='w-full h-12 px-4 rounded-xl outline-none border border-gray-300 
                                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                                     transition-all duration-200'
                        />
                    </div>

                    <button
                        onClick={sendRoom}
                        className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 
                                 text-white font-semibold rounded-xl hover:from-indigo-600 
                                 hover:to-indigo-700 transition-all duration-200 shadow-md 
                                 hover:shadow-lg tracking-wide'
                    >
                        SOHBETE BAŞLA
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Room