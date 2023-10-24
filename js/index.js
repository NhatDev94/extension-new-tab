import * as core from './core.js'

const inputAdd = document.querySelector('#input-add')
const settingIcon = document.querySelector('#setting-icon')
const settingItems = document.querySelectorAll('.setting-item')
const cancelModalQuickAccess = document.querySelector('.modal-quick .close')
const submitButtonQuickAccess = document.querySelector('.modal-quick .submit')
const workingDay = document.querySelector('.working-day .text')
const workingDayOverlay = document.querySelector('.working-day .day-overlay')

core.setBackground()
core.renderTodo()
core.renderQuickAccess()

workingDay.innerText = core.getDayRange() + 'th working day'
core.onRenderTextAnimation(workingDayOverlay)

inputAdd?.addEventListener('keypress', core.onAddTodo)

settingIcon?.addEventListener('click', core.toggleOpenModalSetting)

settingItems?.forEach(settingItem => {
    const title = settingItem?.querySelector('h4')
    const input = settingItem?.querySelector('input')
    title?.addEventListener('click', () => core.onClickTitle(title, input))

    input && input.addEventListener('blur', () => core.onBlurInput(title, input))
    input && input.addEventListener('keypress', (e) => core.onSetting(e, settingItem))
})

cancelModalQuickAccess.addEventListener('click', core.closeModalAccess)
submitButtonQuickAccess.addEventListener('click', core.onCreateQuickAccess)