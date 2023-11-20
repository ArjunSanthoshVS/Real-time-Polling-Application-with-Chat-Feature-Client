import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { io } from 'socket.io-client';

const socket = io("https://scintillate-server.onrender.com");

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const Poll = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user.user._id
    const [voteCount, setVoteCount] = useState([0, 0, 0]);

    const handleVote = async (index, lang) => {
        try {
            const updatedVotes = [...voteCount];
            updatedVotes[index] += 1;
            setVoteCount(updatedVotes);
            await axios.post('https://scintillate-server.onrender.com/poll/vote', { lang, userId });
            socket.emit('vote', { index, votes: updatedVotes });
        } catch (error) {
            alert("Maximum reached...!");
            window.location.reload()
        }
    };

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await axios.get('https://scintillate-server.onrender.com/poll/getAllVotes');
                const fetchedVotes = response.data || [];

                const countMap = {};
                fetchedVotes.forEach((vote) => {
                    const { option, count } = vote;
                    countMap[option] = (countMap[option] || 0) + count;
                });

                const initialCounts = data.labels.map((lang) => countMap[lang] || 0);
                setVoteCount(initialCounts);
            } catch (error) {
                console.error('Error fetching votes:', error);
            }
        };
        fetchVotes();
    }, []);

    useEffect(() => {
        socket.on('update-votes', (data) => {
            setVoteCount(data.votes);
        });

        return () => {
            socket.off('update-votes');
        };
    }, []);

    const data = {
        labels: ['JavaScript', 'C Programming', 'Python'],
        datasets: [
            {
                label: 'Vote',
                data: voteCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: 'white',
                borderWidth: 1,
            }
        ]
    };

    const options = {
        // Add your chart options here
    };

    return (
        <div>
            <h3>You have 5 Votes....!</h3>
            <div>
                {data.labels.map((lang, index) => (
                    <button key={index} onClick={() => handleVote(index, lang)}>
                        {lang} - {voteCount[index]} votes
                    </button>
                ))}
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Poll;
