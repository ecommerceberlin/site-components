

import { useTranslate } from '../i18n'


const PrizeDetails = ({name, min, max, level}) => {

    const [translate] = useTranslate()

/*
{
"id": 1,
"organizer_id": 1,
"group_id": 1,
"name": "badges",
"disabled": 0,
"min": 1,
"max": 1,
"level": 200,
"created_at": "2021-10-03 12:20:07",
"updated_at": "2021-10-03 12:20:07"
},
 */
    return (<ul>
    <li>{translate("prizes.min")}: {min}</li>
    <li>{translate("prizes.max")}: {max}</li>
    <li>{translate("prizes.level")}: {level}</li>
    </ul>)
}

export default PrizeDetails