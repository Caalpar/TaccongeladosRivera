class Modal {
    constructor(id,zIndex='3') {
      this.modal = document.createElement('div')
      this.modal.style.display = 'none'
      this.modal.style.position = 'fixed'
      this.modal.style.zIndex = zIndex
      this.modal.style.paddingTop = '100px'; /* Location of the box */
      this.modal.style.left = '0';
      this.modal.style.top = '0';
      this.modal.style.width = '100%'; /* Full width */
      this.modal.style.height = '100%'; /* Full height */
      this.modal.style.overflow = 'auto'; /* Enable scroll if needed */
      this.modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
  
      this.modal_content = document.createElement('div')
      this.modal_content.style.backgroundColor = '#fefefe';
      this.modal_content.style.margin = 'auto'
      this.modal_content.style.padding = '20px'
      this.modal_content.style.border = '1px solid #888'
      this.modal_content.style.width = '80%'
  
      this.close = document.createElement('span')
      this.close.style.color = '#aaaaaa'
  
      this.close.style.float = 'right'
      this.close.innerHTML = '&times'
      this.close.id = 'close_modal_' + id
      this.close.addEventListener('mouseover', (event) => {
        this.close.style.color = '#000'
        this.close.style.textDecoration = 'none'
        this.close.style.cursor = 'pointer'
      })
  
      this.close.addEventListener('click', (event) => {
        this.modal.style.display = 'none'
      })
  
      this.modal_content.appendChild(this.close)
  
      this.modal.appendChild(this.modal_content)
  
      this.modal.id = 'modal_' + id
  
    }
  
    getModal() {
      return this.modal
    }
    setModalContent(element) {
      element.style.padding = '10px'
      element.style.margin = '2px'
      this.modal_content.appendChild(element)
    }
  }

