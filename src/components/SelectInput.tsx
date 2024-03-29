import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { IconeCheck, IconeSetasCimaBaixo } from "./icons"
import Image from 'next/image'

interface SelectInputProps {
    tipo?: 'select'
    texto: string
    valor: any
    somenteLeitura?: boolean
    className?: any
    valorMudou?: (valor: any) => void
}

const people = [
    {
      id: 1,
      name: 'Entrada',
      avatar:
        './images/food/entrada.png',
    },
    {
      id: 2,
      name: 'Prato principal',
      avatar:
        './images/food/prato-principal.png',
    },
    {
      id: 3,
      name: 'Sobremesa',
      avatar:
        './images/food/sobremesa.png',
    },
    {
      id: 4,
      name: 'Bebida sem álcool',
      avatar:
        './images/food/bebida-nao-alcoolica.png',
    },
    {
      id: 5,
      name: 'Bebida alcoólica',
      avatar:
        './images/food/bebida-alcoolica.png',
    },    
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  

export default function SelectInput(props: SelectInputProps) {
    const [selected, setSelected] = useState(people[0])
    function handleListboxChange(selectedPerson) {
        setSelected(selectedPerson);
        props.valorMudou?.(selectedPerson.name);
    }
    return (
        <div className={`flex flex-col ${props.className}`}>
            
            <Listbox value={selected} onChange={(selectedPerson) => handleListboxChange(selectedPerson)}>
            {({ open }) => (
                <>
                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{props.texto}</Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                            <Image src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                            <span className="ml-3 block truncate">{selected.name}</span>
                        </span>
                        {/* <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <IconeSetasCimaBaixo className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span> */}
                        </Listbox.Button>

                        <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person) => (
                            <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                classNames(
                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                                }
                                value={person}
                            >
                                {({ selected, active }) => (
                                <>
                                    <div className="flex items-center">
                                    <Image src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                    <span
                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                    >
                                        {person.name}
                                    </span>
                                    </div>

                                    {selected ? (
                                    <span
                                        className={classNames(
                                        active ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                    >
                                        {/* <IconeCheck className="h-5 w-5" aria-hidden="true" /> */}
                                    </span>
                                    ) : null}
                                </>
                                )}
                            </Listbox.Option>
                            ))}
                        </Listbox.Options>
                        </Transition>
                    </div>
                    </>
                )}
                </Listbox>
        </div>
    )
}