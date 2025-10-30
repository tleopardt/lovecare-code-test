import Link from "next/link";

export type CharactersPropType = {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
}

type ListCharacterProps = {
    data: CharactersPropType[];
    lastItemRef: (element: HTMLElement | null) => void
}

function ListCharacters({ data, lastItemRef }: ListCharacterProps) {
  return (
    <div className='flex row flex-wrap gap-[var(--item-gap)]'>
        {
            data.map((item, index) => (
                <Link 
                    className='card-item' 
                    href={`character/${item.id}`} key={index} 
                    ref={data.length === index + 1 ? lastItemRef : null}
                >
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-auto" />

                    <div className="card-desc">
                        <label className='text-md font-bold line-clamp-1 md:text-xl md:line-clamp-2'>
                            {item.name}
                        </label>

                        <p className="text-sm line-clamp-1 md:text-normal">
                            {`${item.species} - ${item.status}`}
                        </p>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default ListCharacters