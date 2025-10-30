'use client';

import { getCharacterDetails, getCharacterEpisodes } from '~/services';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/app/components/Table';
import SkeletonContainer from '~/app/components/Skeleton';
import MapPinIcon from '~/assets/icons/MapPinIcon';
import { CharacterDetailType, EpisodeType } from '../types';

function CharacterDetail() {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    const [episodes, setEpisodes] = useState<Array<EpisodeType>>([]);
    const [detail, setDetail] = useState<CharacterDetailType>({
        name: '',
        status: 'unknown',
        species: '',
        type: '',
        gender: 'unknown',
        origin: { name: '', url: '' },
        location: { name: '', url: '' },
        image: '',
        episode: [],
        url: '',
        created: ''
    });

    useEffect(() => {
        if (!params || !params.id) {
            router.push('/');
            
            return;
        }

        loadAllData();
    }, [params])
    
    const loadAllData = async () => {
        const response = await getCharacterDetails(Number(params.id));
        
        if (response) {
            setDetail(response.data)

            const episodes = response.data.episode.map((item: string) => 
                Number(item.split('/').pop())
            );

            loadAllEpisodes(episodes)

        } else {
            setIsLoading(false);
            setIsError(true);
        }
    }

    const loadAllEpisodes = async (episodes: Array<number>) => {
        const response = await getCharacterEpisodes(episodes);

        if (response) {
            const result = Array.isArray(response.data)
                ? response.data
                : [response.data]

            setEpisodes(
                result.map((item: EpisodeType) => ({
                    name: item.name,
                    episode: item.episode,
                    air_date: item.air_date
                }))
            )

            setIsLoading(false);

        } else {
            setIsLoading(false);
            setIsError(true);
        }
    }

    const renderGridContent = useCallback((label: string, value: string, flexNum?: number) => {
        return (
            <SkeletonContainer className={`flex-${flexNum ?? 1} h-[40px]`} isLoading={isLoading}>
                <div className={`flex-${flexNum ?? 1}`}>
                    <label className='font-semibold text-sm colors-gray/50'>{label}</label>
                    <p className='text-md'>{value}</p>
                </div>
            </SkeletonContainer>
        )
    }, [isLoading])

    return (
        <main>
            <div className="flex flex-col justify-center gap-3 !py-[4em] !px-[5%] md:!px-[15%]">
                <div className='flex flex-row items-center gap-8'>

                    <SkeletonContainer className='w-[100px] h-[100px] !rounded-full' isLoading={isLoading}>
                        <img className='w-[100px] h-[100px] rounded-full' src={detail.image} />
                    </SkeletonContainer>

                    <div className='flex-1 flex flex-col gap-1'>
                        <SkeletonContainer className='w-[100%] md:w-[200px] h-[20px] !mb-3' isLoading={isLoading}>
                            <h3 className='font-bold text-xl'>{detail.name}</h3>
                        </SkeletonContainer>
                        
                        <SkeletonContainer className='w-[100%] md:w-[150px] h-[20px]' isLoading={isLoading}>
                            <div className='flex gap-2'>
                                <MapPinIcon width={20} height={20} />
                                <p>{detail.location.name}</p>
                            </div>
                        </SkeletonContainer>
                    </div>
                </div>

                <div className='flex gap-3 md:gap-8 w-full'>
                    {renderGridContent('Status', detail.status)}
                    {renderGridContent('Species', detail.species)}
                    {renderGridContent('Origin', detail.origin.name)}
                </div>

                <div className='flex gap-3 md:gap-8'>
                    {renderGridContent('Type', detail.type === '' ? '-' : detail.type)}
                    {renderGridContent('Gender', detail.gender, 1)}
                    <div className='flex-1' />
                </div>

                <SkeletonContainer className='w-[200px] h-[30px]' isLoading={isLoading}>
                    <label className='font-bold text-xl'>Episodes</label>
                </SkeletonContainer>

                <SkeletonContainer className='w-full h-[200px]' isLoading={isLoading}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Episode</TableHeader>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Air Date</TableHeader>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                episodes.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.episode}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.air_date}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </SkeletonContainer>
            </div>
        </main>
    )
}

export default CharacterDetail