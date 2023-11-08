import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Poll = () => {
    const [votes, setVotes] = useState([0, 0, 0]);

    const handleVote = (index) => {
        const updatedVotes = [...votes];
        updatedVotes[index] += 1;
        setVotes(updatedVotes);

        socket.emit('vote', { index, votes: updatedVotes });
    };

    useEffect(() => {
        socket.on('update-votes', (data) => {
            setVotes(data.votes);
        });

        return () => {
            socket.off('update-votes');
        };
    }, []);

    const data = {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [
            {
                label: 'Vote',
                data: votes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Red color for 'Mon'
                    'rgba(54, 162, 235, 0.6)', // Blue color for 'Tue'
                    'rgba(75, 192, 192, 0.6)', // Green color for 'Wed'
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
            <div>
                {data.labels.map((day, index) => (
                    <button key={index} onClick={() => handleVote(index)}>
                        {day} - {votes[index]} votes
                    </button>
                ))}
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Poll;
