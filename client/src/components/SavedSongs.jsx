const people = [
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },    
    // More people...
]

export default function SavedSongs({ songs }) {
    

    return (
        <div className='p-2 overflow-y-auto h-3/5'>
            <div>
                <div className='flex justify-center'>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:mt-5">Saved Songs</h2>
                </div>
                <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-5"></div>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {songs.map((song) => (
                    <li
                        key={song._id}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-8">
                            <img className="mx-auto h-32 w-32 flex-shrink-0 object-cover" src={song.coverart} alt="" />
                            <h3 className="mt-6 text-sm font-medium text-gray-900">{song.artist}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dd className="text-sm text-gray-500">{song.title}</dd>
                            </dl>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
