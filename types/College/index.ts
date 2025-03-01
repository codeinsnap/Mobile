export type TCollegeName ={
        "institute_id": number
        "name": string
}

export type TCollegeNameDropdownList = {
    value: number
    label: string
}

export type TCollegeSliceInitialState = {
    collegeList: TCollegeNameDropdownList[]
}