import React, { useState, useEffect } from 'react';

const Chat = ({ socket, username, room }) => {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.emit("room", room);

        socket.on("messageReturn", (data) => {
            console.log("Karşı taraftan mesaj alındı:", data);
            setMessageList(prevMessages => [...prevMessages, data]);
        });

        return () => {
            socket.off("messageReturn");
        };
    }, [socket, room]);

    const sendMessage = async () => {
        if (message.trim() === "") return;

        const messageData = {
            room: room,
            username: username,
            message: message,
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        };

        await socket.emit("message", messageData);
        setMessageList(prevMessages => [...prevMessages, messageData]); // Kendi mesajımızı ekle
        setMessage("");
    };


    // Enter tuşu ile mesaj gönderme fonksiyonu eklendi
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white p-4">
            <div className="w-full max-w-4xl bg-white h-[600px] relative rounded-xl shadow-2xl">
                {/* Header */}
                <div className="w-full h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 flex items-center p-4 rounded-t-xl">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-indigo-600 font-bold text-lg">{room[0]?.toUpperCase()}</span>
                    </div>
                    <div className="ml-4 text-white">
                        <h2 className="font-semibold text-lg">Oda: {room}</h2>
                        <p className="text-sm text-indigo-200">{username}</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="w-full h-[460px] overflow-y-auto p-6 bg-gray-50 scroll-smooth">
                    {messageList.map((msg, i) => (
                        <div key={i} className={`${username === msg.username ? "flex justify-end" : ""} mb-4`}>
                            <div className={`${username === msg.username
                                ? "bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                                : "bg-gradient-to-r from-gray-600 to-gray-700 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                                } max-w-[70%] p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-200`}>
                                <div className="text-sm">{msg.message}</div>
                                <div className="w-full flex justify-end text-xs mt-2 text-indigo-100">
                                    {msg.username} • {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input area */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100 rounded-b-xl">
                    <div className="flex gap-3">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            type="text"
                            placeholder="Mesajınızı yazın..."
                            className="w-full h-12 px-6 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                        />
                        <button
                            onClick={sendMessage}
                            className="px-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 text-white font-semibold shadow-md hover:shadow-lg"
                        >
                            Gönder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;