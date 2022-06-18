import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts'

export default function ChartsContainer() {
    const { monthlyApplications } = useAppContext()

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart
                    data={monthlyApplications}
                    margin={{
                        top: 50,
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
                </AreaChart>
            </ResponsiveContainer>
        </Wrapper>
    )
}