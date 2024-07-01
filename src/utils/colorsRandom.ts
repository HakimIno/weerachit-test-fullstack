export const generateRandomColor = (randomIndex: number) => {
    const colors = [
        'bg-blue-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-red-200',
        'bg-purple-200',
        'bg-pink-200',
        'bg-indigo-200',
        'bg-gray-200',
        'bg-orange-200',
        // Add more colors as needed
    ];

    return colors[randomIndex];
};