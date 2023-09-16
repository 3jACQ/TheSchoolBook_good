
type Badge = {
    badge: {
        color: string,
        name: string,
        description: string,
    }
}

interface UserAchivementprops extends React.HTMLAttributes<HTMLDivElement> {
    badges: Badge[]
}

export function UserAchivement({ badges }: UserAchivementprops) {
    return badges.length ? (
        <div>
            <p className="text-secondaryText mt-8 mb-4">Achivements</p>
            <div className="flex flex-wrap gap-8">
                {badges.map((badge, index) => (
                   <div className="font-light text-sm text-white px-2 py-1 rounded-full" style={{background:badge.badge.color}} key={index}>
                        {badge.badge.name}
                   </div>
                ))}
            </div>
        </div>

    ) : null
}