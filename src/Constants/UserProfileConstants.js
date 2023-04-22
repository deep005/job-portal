const genderOptions = [
    { value: 'M', label: 'M' },
    { value: 'F', label: 'F' },
];
const locationOptions = [
    { value: 'blr', label: 'Bangalore' },
    { value: 'hyd', label: 'Hyderabad' },
    { value: 'che', label: 'Chennai' },
    { value: 'mum', label: 'Mumbai' },
    { value: 'del', label: 'Delhi-NCR' },
];
const yoeOptions = [
    { value: '5', label: '0-4' },
    { value: '10', label: '5-9' },
    { value: '15', label: '10-14' },
    { value: '25', label: '15+' },
];
const degreeOptions = [
    { value: 'B.Tech', label: 'B.Tech' },
    { value: 'M.Tech', label: 'B.Tech' },
    { value: 'BCA', label: 'BCA' },
    { value: 'MCA', label: 'MCA' },
    { value: 'BA', label: 'BA' },
    { value: 'MA', label: 'MA' },
    { value: 'high-school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
];

const skills = [
    { value: 'JS', label: 'JS' },
    { value: 'React', label: 'React' },
    { value: 'PHP', label: 'PHP' },
    { value: 'ROR', label: 'ROR' },
    { value: 'Java', label: 'Java' },
    { value: 'Node', label: 'Node' },
    { value: 'Kotlin', label: 'Kotlin' }
]

const userProfileConstants = {
    genderOptions: genderOptions,
    locationOptions: locationOptions,
    yoeOptions: yoeOptions,
    degreeOptions: degreeOptions,
    skillsOptions: skills
}

export default userProfileConstants;

