export const setBackground = (bgUrl) => {
    if (localStorage.getItem('bg') || bgUrl) {
        const imgBg = document.querySelector('#img-bg')
        imgBg.src = bgUrl || localStorage.getItem('bg')
    }
}

export const onChangeStatus = (e) => {
    const data = JSON.parse(localStorage.getItem('todos')) || []
    if (e.target.classList.value?.indexOf('delete') > -1) return
    data?.forEach(todo => {
        if (+todo?.id === +e.target.id) {
            todo.status = todo?.status === 'todo' ? 'done' : 'todo'
        }
    })
    localStorage.setItem('todos', JSON.stringify(data))
    renderTodo()
}

export const onDeleteTodo = (e) => {
    const data = JSON.parse(localStorage.getItem('todos')) || []
    const newData = data?.filter(todo => +todo?.id !== +e.target.id)
    localStorage.setItem('todos', JSON.stringify(newData))
    renderTodo()
}

export const renderTodo = () => {
    const listEl = document.querySelector('.todo-content ul')
    const data = JSON.parse(localStorage.getItem('todos')) || []
    listEl.innerHTML = ''
    data?.forEach(todo => {
        const li = document.createElement('li')
        const input = document.createElement('input')
        const label = document.createElement('label')
        const deleteEl = document.createElement('div')

        deleteEl.classList.add('delete')
        deleteEl.id = todo?.id

        input.type = 'checkbox'
        input.id = todo?.id
        input.checked = todo?.status === 'done'

        label.setAttribute('for', todo?.id)
        label.innerText = todo?.name
        label.id = todo?.id
        label.style.textDecoration = todo?.status === 'done' ? 'line-through' : 'none'

        li.id = todo?.id
        li.appendChild(input)
        li.appendChild(label)
        todo?.status === 'done' && li.appendChild(deleteEl)
        listEl.appendChild(li)
        li.addEventListener('click', onChangeStatus)
        deleteEl.addEventListener('click', onDeleteTodo)
    })
}

export const onAddTodo = (e) => {
    const data = JSON.parse(localStorage.getItem('todos')) || []
    if (e.key === 'Enter' && e.target.value) {
        const newTodo = {
            name: e.target.value,
            status: 'todo',
            id: Math.random()
        }
        data.push(newTodo)
        localStorage.setItem('todos', JSON.stringify(data))
        renderTodo(data)
        e.target.value = ''
    }
}

export const toggleOpenModalSetting = () => {
    const settingContent = document.querySelector('#setting-content')
    if (settingContent.style.display === '' || settingContent.style.display === 'none') {
        settingContent.style.display = 'block'
        return
    }
    settingContent.style.display = 'none'
}

export const onSetting = (e, settingItem) => {
    if (e.key === 'Enter' && e.target.value && settingItem?.classList?.value?.indexOf('change-bg') > -1) {
        setBackground(e.target.value)
        localStorage.setItem('bg', e.target.value)
        e.target.value = ''
    }

    if (e.key === 'Enter' && e.target.value && settingItem?.classList?.value?.indexOf('add-link') > -1) {
        // Add link
    }
}

export const onClickTitle = (title, input) => {
    if (title?.classList.value?.includes('change-layout')) {
        const setting = document.querySelector('.setting')
        const settingContent = document.querySelector('.setting-content')
        const todo = document.querySelector('.todo')
        if (setting?.getBoundingClientRect()?.left < 200) {
            setting.classList.remove('setting-left')
            setting.classList.add('setting-right')

            settingContent.classList.remove('setting-content-left')
            settingContent.classList.add('setting-content-right')

            todo.classList.remove('todo-right')
            todo.classList.add('todo-left')
        } else {
            setting.classList.remove('setting-right')
            setting.classList.add('setting-left')

            settingContent.classList.remove('setting-content-right')
            settingContent.classList.add('setting-content-left')

            todo.classList.remove('todo-left')
            todo.classList.add('todo-right')
        }
        return
    }
    title.style.display = 'none'
    input.style.display = 'block'
    input.focus()
}

export const onBlurInput = (title, input) => {
    title.style.display = 'block'
    input.style.display = 'none'
    input.value = ''
}


// QUICK ACCESS
export const renderQuickAccess = () => {
    const list = JSON.parse(localStorage.getItem('quick-access')) || []
    const ul = document.querySelector('.quick-access ul')
    ul.innerHTML = ''
    list?.forEach(item => {
        const li = document.createElement('li')
        const div = document.createElement('div')
        const image = document.createElement('img')
        const p = document.createElement('p')
        const deleteEl = document.createElement('p')
        deleteEl.classList.add('delete')

        li.classList.add('item')
        p.innerText = item?.name
        image.src = item?.icon

        div.appendChild(image)
        li.appendChild(div)
        li.appendChild(p)
        li.appendChild(deleteEl)
        ul.appendChild(li)

        div.addEventListener('click', e => onClickQuickAccessItem(item))
        p.addEventListener('click', e => onClickQuickAccessItem(item))
        deleteEl.addEventListener('click', () => onDeleteQuickAccess(item))
    })

    const li = document.createElement('li')
    const div = document.createElement('div')
    li.classList.add('item')
    div.innerText = '+'
    div.style.fontSize = '32px'
    div.style.fontWeight = '600'
    div.style.color = 'white'
    div.style.paddingBottom = '7px'

    li.appendChild(div)
    ul.appendChild(li)

    div.addEventListener('click', onOpenModalAccess)
}

export const onClickQuickAccessItem = (item) => {
    window.location.href = item?.url
}

export const closeModalAccess = () => {
    const modal = document.querySelector('.modal-quick')
    modal.style.display = 'none'
}

export const onOpenModalAccess = () => {
    const modal = document.querySelector('.modal-quick')
    modal.style.display = 'flex'
}

export const renderIconQuickAccess = (url) => {
    const youtubeIcon = 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/395_Youtube_logo-512.png'
    const chatGPTIcon = 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png'
    const faIcon = 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-512.png'

    let icon = null
    if (url.includes('youtube')) {
        icon = youtubeIcon
    }
    if (url?.includes('openai')) {
        icon = chatGPTIcon
    }
    if (url?.includes('facebook')) {
        icon = faIcon
    }
    console.log(icon);
    return icon
}

export const onDeleteQuickAccess = (quickItem) => {
    const list = JSON.parse(localStorage.getItem('quick-access')) || []
    const newList = list?.filter(item => item?.url !== quickItem?.url)
    localStorage.setItem('quick-access', JSON.stringify(newList))
    renderQuickAccess()
}

export const onCreateQuickAccess = () => {
    const url = document.querySelector('.url')
    const name = document.querySelector('.name')
    if (!url?.value || !name?.value) return

    const list = JSON.parse(localStorage.getItem('quick-access')) || []

    const quickAccessItem = {
        name: name?.value,
        url: url?.value,
        icon: renderIconQuickAccess(url?.value)
    }
    list.push(quickAccessItem)
    localStorage.setItem('quick-access', JSON.stringify(list))
    url.value = ''
    name.value = ''
    closeModalAccess()
    renderQuickAccess()
}

export const getDayRange = () => {
    const now = new Date()
    const fromDay = new Date('2022-03-21')
    const onDay = 24 * 60 * 60 * 1000
    return Math.round((now - fromDay) / onDay)
}

export const onRenderTextAnimation = (el) => {
    const RANGE = 8
    const width = el.offsetWidth
    let widthDown = 0
    let count = 0
    setInterval(() => {
        if (widthDown >= width - 5) {
            count++
            if (count > 15) {
                el.style.width = width + 'px'
                widthDown = 0
                count = 0
            }
            return
        }
        widthDown = widthDown + RANGE < width ? widthDown + RANGE : width
        el.style.width = width - widthDown + 'px'
    }, 100)
}