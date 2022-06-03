import Wrapper from '../assets/wrappers/JobInfo'

const JobInfo = ({ icon, text, isLink }) => {
    return (
        <Wrapper>
            <span className='icon'>{icon}</span>
            {isLink ? <span className='link'><a href={text} target="_blank">Link</a></span> : <span className='text'>{text}</span>}
        </Wrapper>
    )
}

export default JobInfo