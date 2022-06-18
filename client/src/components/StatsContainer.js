import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import { ImCross } from 'react-icons/im'
import { GrAchievement } from 'react-icons/gr'
import { AiOutlineFileDone } from 'react-icons/ai'

import Wrapper from '../assets/wrappers/StatsContainer'
const StatsContainer = () => {
    const { stats } = useAppContext()
    const defaultStats = [
        {
            title: 'pending applications',
            count: stats.pending || 0,
            icon: <MdPendingActions />,
            color: '#e9b949',
            bcg: '#fcefc7',
        },
        {
            title: 'scheduled',
            count: stats.scheduled || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            title: 'applied',
            count: stats.applied || 0,
            icon: <AiOutlineFileDone />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
        {
            title: 'offered',
            count: stats.offered || 0,
            icon: <GrAchievement />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
        {
            title: 'declined',
            count: stats.rejected || 0,
            icon: <ImCross />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        }
    ]

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

export default StatsContainer