const Label = ({ name, value }) => {
    return (
        <div className="mb-2 flex items-center gap-2">
            <label className="block mb-1 text-gray-800 font-bold">{name}</label>
            <div className="text-gray-600 ">{value}</div>
        </div>
    );
};

export default Label
