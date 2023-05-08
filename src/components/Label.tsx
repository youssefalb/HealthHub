const Label = ({ name, value }) => {
    return (
        <div className="mb-2">
            <label className="block mb-1 text-gray-500">{name}</label>
            <div className="text-gray-800 font-bold">{value}</div>
        </div>
    );
};

export default Label
