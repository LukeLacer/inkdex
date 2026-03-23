import React, { useState } from 'react'
import { ReactSortable, GroupOptions } from 'react-sortablejs'

interface ItemType {
    id: number
    name: string
}

const DragAndDropExample = () => {
    const [list1, setList1] = useState<ItemType[]>([
        { id: 1, name: "https://lorcana-api.com/images/mickey_mouse/inspirational_warrior/mickey_mouse-inspirational_warrior-large.png" },
        { id: 2, name: "https://lorcana-api.com/images/minnie_mouse/pirate_lookout/minnie_mouse-pirate_lookout-large.png" },
        { id: 3, name: "https://lorcana-api.com/images/goofy/flying_goof/goofy-flying_goof-large.png" },
        { id: 4, name: "https://api.lorcana.ravensburger.com/images/en/set9/83_c529890feb84bc6a34a403602caa100d46dad038.jpg" },
        { id: 5, name: "https://lorcana-api.com/images/clarabelle/light_on_her_hooves/clarabelle-light_on_her_hooves-large.png" },
        { id: 6, name: "https://lorcana-api.com/images/daisy_duck/spotless_food-fighter/daisy_duck-spotless_food-fighter-large.png" },
    ])

    const [list2, setList2] = useState<ItemType[]>([])

    const group: GroupOptions = { name: 'groupName', pull: 'clone' }

    return (
        <>
            <ReactSortable
                style={{ width: '200px' }}
                list={list1}
                setList={setList1}
                group={{ ...group, put: false }}
                animation={200}
                delay={2}
            >
                {list1.map((item) => (
                    <div
                        style={{
                            cursor: 'grab',
                            margin: '10px',
                            padding: '5px',
                            border: '1px solid #ccc',
                        }}
                        key={item.id}
                    >
                        <img
                            style={{ maxWidth: '50px' }}
                            src={item.name}
                            alt="test"
                        />
                    </div>
                ))}
            </ReactSortable>
            <ReactSortable
                style={{
                    width: '200px',
                    minHeight: '200px',
                    backgroundColor: '#f9f910',
                }}
                list={list2}
                setList={setList2}
                group={group}
                animation={200}
                delay={2}
                removeOnSpill={true}
            >
                {list2.map((item) => (
                    <div
                        style={{
                            cursor: 'grab',
                            margin: '10px',
                            padding: '5px',
                            border: '1px solid #ccc',
                        }}
                        key={item.id}
                    >
                        <img
                            style={{ maxWidth: '50px' }}
                            src={item.name}
                            alt="test"
                        />
                    </div>
                ))}
            </ReactSortable>
        </>
    )
}

export default DragAndDropExample
