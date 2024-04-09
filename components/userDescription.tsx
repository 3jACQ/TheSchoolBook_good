"use client"
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { updateDesc } from '@/lib/action/user.action';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function UserDescription({ text, userId }: { text: string, userId: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(text);
    const updateWithId = updateDesc.bind(null, userId)
    const searchParams = useSearchParams()
    const router = useRouter()
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    let succes = searchParams ? searchParams.get('success') : null;
    console.log(succes)

    useEffect(() => {
        if (succes !== null) {
            setIsEditing(false);
            router.push('/app/dashboard/profile')
        }
    }, [succes]);

    return (
        <div>
            <div className='mt-8 mb-4 flex gap-10'>
                <p className="text-secondaryText ">Description</p>
               {!isEditing &&  <button className="hover:text-primary cursor-pointer" onClick={handleEditClick}>
                    <Pencil size={20} />
                </button>}
            </div>


            {isEditing ? (
                <div >
                    <form className='flex flex-col gap-2 justify-start' action={updateWithId}>
                        <textarea name='desc' rows={5} placeholder='Enter your new description ...' className='border border-blue-gray-200 p-2 w-[50%]' value={description} onChange={handleDescriptionChange} />
                        <div className='flex gap-2'>
                            <Button type='submit' className='w-[85px] px-6 rounded-sm'>Save</Button>
                            <Button onClick={() => setIsEditing(false)} variant={"secondary"} className='w-[85px] px-6 rounded-sm'>Cancel</Button>
                        </div>

                    </form>

                </div>
            ) : (
                <div>
                    {description.length > 0 ? ( <div className='w-[50%]'> <p className=" font-light text-sm">{description}</p></div>) : <p className="text-sm text-muted-foreground">No description</p>}
                </div>
            )}
        </div>
    );
}