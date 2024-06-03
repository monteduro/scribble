// resources/js/utils.js
var hideLoadingIndicator = (hide_loader = false) => {
  if (hide_loader)
    document.querySelector("#scribble-editor-loading-indicator .loader").classList.add("hidden");
  else
    document.getElementById("scribble-editor-loading-indicator").classList.add("hidden");
};

// resources/js/modal.js
window.scribbleModal = () => {
  return {
    show: false,
    showActiveComponent: true,
    activeComponent: false,
    componentHistory: [],
    modalWidth: null,
    modalAlignment: null,
    isSlideOver: false,
    slideDirection: "right",
    listeners: [],
    getActiveComponentModalAttribute(key) {
      if (this.$wire.get("components")[this.activeComponent] !== void 0) {
        return this.$wire.get("components")[this.activeComponent]["modalAttributes"][key];
      }
    },
    closeModalOnEscape() {
      if (this.getActiveComponentModalAttribute("closeOnEscape") === false) {
        return;
      }
      let force = this.getActiveComponentModalAttribute("closeOnEscapeIsForceful") === true;
      this.closeScribbleModal(force);
    },
    closeModalOnClickAway() {
      if (this.getActiveComponentModalAttribute("closeOnClickAway") === false) {
        return;
      }
      this.closeScribbleModal(true);
    },
    closeScribbleModal(force = false, skipPreviousModals = 0, destroySkipped = false) {
      if (this.show === false) {
        return;
      }
      if (this.getActiveComponentModalAttribute("dispatchCloseEvent") === true) {
        const componentName = this.$wire.get("components")[this.activeComponent].name;
        Livewire.dispatch("scribbleModalClosed", { name: componentName });
      }
      if (this.getActiveComponentModalAttribute("destroyOnClose") === true) {
        Livewire.dispatch("destroyScribbleComponent", { id: this.activeComponent });
      }
      if (skipPreviousModals > 0) {
        for (let i = 0; i < skipPreviousModals; i++) {
          if (destroySkipped) {
            const id2 = this.componentHistory[this.componentHistory.length - 1];
            Livewire.dispatch("destroyScribbleComponent", { id: id2 });
          }
          this.componentHistory.pop();
        }
      }
      const id = this.componentHistory.pop();
      if (id && !force) {
        if (id) {
          this.setActiveModalComponent(id, true);
        } else {
          this.setShowPropertyTo(false);
        }
      } else {
        this.setShowPropertyTo(false);
      }
      hideLoadingIndicator();
    },
    setActiveModalComponent(id, skip = false) {
      this.setShowPropertyTo(true);
      if (this.activeComponent === id) {
        return;
      }
      if (this.activeComponent !== false && skip === false) {
        this.componentHistory.push(this.activeComponent);
      }
      let focusableTimeout = 50;
      if (this.activeComponent === false) {
        this.activeComponent = id;
        this.showActiveComponent = true;
        this.initializeComponent();
      } else {
        this.showActiveComponent = false;
        focusableTimeout = 400;
        setTimeout(() => {
          this.activeComponent = id;
          this.showActiveComponent = true;
          this.initializeComponent();
        }, 300);
      }
      this.$nextTick(() => {
        let focusable = this.$refs[id]?.querySelector("[autofocus]");
        if (focusable) {
          setTimeout(() => {
            focusable.focus();
          }, focusableTimeout);
        }
      });
    },
    initializeComponent() {
      this.modalWidth = this.getActiveComponentModalAttribute("maxWidth");
      this.modalAlignment = this.getActiveComponentModalAttribute("alignment");
      this.isSlideOver = this.getActiveComponentModalAttribute("isSlideOver");
      this.slideDirection = this.getActiveComponentModalAttribute("slideDirection");
    },
    focusables() {
      let selector = "a, button, input:not([type='hidden'], textarea, select, details, [tabindex]:not([tabindex='-1'])";
      return [...this.$el.querySelectorAll(selector)].filter((el) => !el.hasAttribute("disabled"));
    },
    firstFocusable() {
      return this.focusables()[0];
    },
    lastFocusable() {
      return this.focusables().slice(-1)[0];
    },
    nextFocusable() {
      return this.focusables()[this.nextFocusableIndex()] || this.firstFocusable();
    },
    prevFocusable() {
      return this.focusables()[this.prevFocusableIndex()] || this.lastFocusable();
    },
    nextFocusableIndex() {
      return (this.focusables().indexOf(document.activeElement) + 1) % (this.focusables().length + 1);
    },
    prevFocusableIndex() {
      return Math.max(0, this.focusables().indexOf(document.activeElement)) - 1;
    },
    setShowPropertyTo(show) {
      this.show = show;
      if (show) {
        hideLoadingIndicator(true);
        document.body.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
        setTimeout(() => {
          this.activeComponent = false;
          this.$wire.resetState();
        }, 300);
      }
    },
    init() {
      this.initializeComponent();
      this.listeners.push(
        Livewire.on("closeScribbleModal", (data) => {
          this.closeScribbleModal(data?.force ?? false, data?.skipPreviousModals ?? 0, data?.destroySkipped ?? false);
        })
      );
      this.listeners.push(
        Livewire.on("activeScribbleModalComponentChanged", ({ id }) => {
          this.setActiveModalComponent(id);
        })
      );
    },
    destroy() {
      this.listeners.forEach((listener) => {
        listener();
      });
    }
  };
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvdXRpbHMuanMiLCAiLi4vanMvbW9kYWwuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0aXBweSBmcm9tICd0aXBweS5qcydcblxuZXhwb3J0IGNvbnN0IHV1aWQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZywgYyA9PlxuICAgICAgICAoYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gYyAvIDQpLnRvU3RyaW5nKDE2KVxuICAgICk7XG59XG5cbmV4cG9ydCBjb25zdCBvcGVuU2NyaWJibGVNb2RhbCA9IChjb21wb25lbnQsIGFyZ3MpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyaWJibGUtZWRpdG9yLWxvYWRpbmctaW5kaWNhdG9yJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NjcmliYmxlLWVkaXRvci1sb2FkaW5nLWluZGljYXRvciAubG9hZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgd2luZG93LkxpdmV3aXJlLmRpc3BhdGNoKCdvcGVuU2NyaWJibGVNb2RhbCcsIHsgY29tcG9uZW50OiBjb21wb25lbnQsIGFyZ3VtZW50czogYXJncyB9KVxufVxuXG5leHBvcnQgY29uc3QgaGlkZUxvYWRpbmdJbmRpY2F0b3IgPSAoaGlkZV9sb2FkZXIgPSBmYWxzZSkgPT4ge1xuICAgIGlmICggaGlkZV9sb2FkZXIgKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NyaWJibGUtZWRpdG9yLWxvYWRpbmctaW5kaWNhdG9yIC5sb2FkZXInKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBlbHNlXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JpYmJsZS1lZGl0b3ItbG9hZGluZy1pbmRpY2F0b3InKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbW1hbmRSdW5uZXIgPSAoZWRpdG9yLCBjb21tYW5kcywgYXJncyA9IFtdKSA9PiB7XG4gICAgY29tbWFuZHMuZm9yRWFjaChjb21tYW5kID0+IHtcbiAgICAgICAgZWRpdG9yLmNoYWluKCkuZm9jdXMoKVtjb21tYW5kLmNvbW1hbmRdKE9iamVjdC5rZXlzKGNvbW1hbmQ/LmFyZ3VtZW50cykubGVuZ3RoID4gMCA/IGNvbW1hbmQuYXJndW1lbnRzIDogYXJncykucnVuKClcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgcmVwbGFjZVN0YXRlUGF0aCA9IChkYXRhLCBzdGF0ZVBhdGgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRhdGEgIT0gXCJvYmplY3RcIikgcmV0dXJuO1xuICAgIGlmICghZGF0YSkgcmV0dXJuOyAvLyBudWxsIG9iamVjdFxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBpZiAoWydzdGF0ZVBhdGgnXS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICBkYXRhW2tleV0gPSBzdGF0ZVBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXBsYWNlU3RhdGVQYXRoKGRhdGFba2V5XSwgc3RhdGVQYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBoaWRlTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCIuL3V0aWxzLmpzXCJcblxud2luZG93LnNjcmliYmxlTW9kYWwgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgIHNob3dBY3RpdmVDb21wb25lbnQ6IHRydWUsXG4gICAgICAgIGFjdGl2ZUNvbXBvbmVudDogZmFsc2UsXG4gICAgICAgIGNvbXBvbmVudEhpc3Rvcnk6IFtdLFxuICAgICAgICBtb2RhbFdpZHRoOiBudWxsLFxuICAgICAgICBtb2RhbEFsaWdubWVudDogbnVsbCxcbiAgICAgICAgaXNTbGlkZU92ZXI6IGZhbHNlLFxuICAgICAgICBzbGlkZURpcmVjdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgbGlzdGVuZXJzOiBbXSxcbiAgICAgICAgZ2V0QWN0aXZlQ29tcG9uZW50TW9kYWxBdHRyaWJ1dGUoa2V5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kd2lyZS5nZXQoJ2NvbXBvbmVudHMnKVt0aGlzLmFjdGl2ZUNvbXBvbmVudF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiR3aXJlLmdldCgnY29tcG9uZW50cycpW3RoaXMuYWN0aXZlQ29tcG9uZW50XVsnbW9kYWxBdHRyaWJ1dGVzJ11ba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbG9zZU1vZGFsT25Fc2NhcGUoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRBY3RpdmVDb21wb25lbnRNb2RhbEF0dHJpYnV0ZSgnY2xvc2VPbkVzY2FwZScpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZm9yY2UgPSB0aGlzLmdldEFjdGl2ZUNvbXBvbmVudE1vZGFsQXR0cmlidXRlKCdjbG9zZU9uRXNjYXBlSXNGb3JjZWZ1bCcpID09PSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jbG9zZVNjcmliYmxlTW9kYWwoZm9yY2UpXG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlTW9kYWxPbkNsaWNrQXdheSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEFjdGl2ZUNvbXBvbmVudE1vZGFsQXR0cmlidXRlKCdjbG9zZU9uQ2xpY2tBd2F5JykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VTY3JpYmJsZU1vZGFsKHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlU2NyaWJibGVNb2RhbChmb3JjZSA9IGZhbHNlLCBza2lwUHJldmlvdXNNb2RhbHMgPSAwLCBkZXN0cm95U2tpcHBlZCA9IGZhbHNlKSB7XG4gICAgICAgICAgICBpZih0aGlzLnNob3cgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldEFjdGl2ZUNvbXBvbmVudE1vZGFsQXR0cmlidXRlKCdkaXNwYXRjaENsb3NlRXZlbnQnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudE5hbWUgPSB0aGlzLiR3aXJlLmdldCgnY29tcG9uZW50cycpW3RoaXMuYWN0aXZlQ29tcG9uZW50XS5uYW1lO1xuICAgICAgICAgICAgICAgIExpdmV3aXJlLmRpc3BhdGNoKCdzY3JpYmJsZU1vZGFsQ2xvc2VkJywge25hbWU6IGNvbXBvbmVudE5hbWV9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRBY3RpdmVDb21wb25lbnRNb2RhbEF0dHJpYnV0ZSgnZGVzdHJveU9uQ2xvc2UnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIExpdmV3aXJlLmRpc3BhdGNoKCdkZXN0cm95U2NyaWJibGVDb21wb25lbnQnLCB7aWQ6IHRoaXMuYWN0aXZlQ29tcG9uZW50fSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNraXBQcmV2aW91c01vZGFscyA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraXBQcmV2aW91c01vZGFsczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0cm95U2tpcHBlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLmNvbXBvbmVudEhpc3RvcnlbdGhpcy5jb21wb25lbnRIaXN0b3J5Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgTGl2ZXdpcmUuZGlzcGF0Y2goJ2Rlc3Ryb3lTY3JpYmJsZUNvbXBvbmVudCcsIHtpZDogaWR9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SGlzdG9yeS5wb3AoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLmNvbXBvbmVudEhpc3RvcnkucG9wKClcblxuICAgICAgICAgICAgaWYgKGlkICYmICFmb3JjZSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU1vZGFsQ29tcG9uZW50KGlkLCB0cnVlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2hvd1Byb3BlcnR5VG8oZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNob3dQcm9wZXJ0eVRvKGZhbHNlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoaWRlTG9hZGluZ0luZGljYXRvcigpXG5cbiAgICAgICAgfSxcbiAgICAgICAgc2V0QWN0aXZlTW9kYWxDb21wb25lbnQoaWQsIHNraXAgPSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaG93UHJvcGVydHlUbyh0cnVlKVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVDb21wb25lbnQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNvbXBvbmVudCAhPT0gZmFsc2UgJiYgc2tpcCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEhpc3RvcnkucHVzaCh0aGlzLmFjdGl2ZUNvbXBvbmVudClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZvY3VzYWJsZVRpbWVvdXQgPSA1MFxuXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVDb21wb25lbnQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVDb21wb25lbnQgPSBpZFxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FjdGl2ZUNvbXBvbmVudCA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnQoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBY3RpdmVDb21wb25lbnQgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlVGltZW91dCA9IDQwMFxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQ29tcG9uZW50ID0gaWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QWN0aXZlQ29tcG9uZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnQoKVxuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGUgPSB0aGlzLiRyZWZzW2lkXT8ucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10nKVxuICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGUuZm9jdXMoKVxuICAgICAgICAgICAgICAgICAgICB9LCBmb2N1c2FibGVUaW1lb3V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpbml0aWFsaXplQ29tcG9uZW50KCkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbFdpZHRoID0gdGhpcy5nZXRBY3RpdmVDb21wb25lbnRNb2RhbEF0dHJpYnV0ZSgnbWF4V2lkdGgnKVxuICAgICAgICAgICAgdGhpcy5tb2RhbEFsaWdubWVudCA9IHRoaXMuZ2V0QWN0aXZlQ29tcG9uZW50TW9kYWxBdHRyaWJ1dGUoJ2FsaWdubWVudCcpXG4gICAgICAgICAgICB0aGlzLmlzU2xpZGVPdmVyID0gdGhpcy5nZXRBY3RpdmVDb21wb25lbnRNb2RhbEF0dHJpYnV0ZSgnaXNTbGlkZU92ZXInKVxuICAgICAgICAgICAgdGhpcy5zbGlkZURpcmVjdGlvbiA9IHRoaXMuZ2V0QWN0aXZlQ29tcG9uZW50TW9kYWxBdHRyaWJ1dGUoJ3NsaWRlRGlyZWN0aW9uJylcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNhYmxlcygpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RvciA9ICdhLCBidXR0b24sIGlucHV0Om5vdChbdHlwZT1cXCdoaWRkZW5cXCddLCB0ZXh0YXJlYSwgc2VsZWN0LCBkZXRhaWxzLCBbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XFwnLTFcXCddKSdcblxuICAgICAgICAgICAgcmV0dXJuIFsuLi50aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV1cbiAgICAgICAgICAgICAgICAuZmlsdGVyKGVsID0+ICFlbC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpXG4gICAgICAgIH0sXG4gICAgICAgIGZpcnN0Rm9jdXNhYmxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNhYmxlcygpWzBdXG4gICAgICAgIH0sXG4gICAgICAgIGxhc3RGb2N1c2FibGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2FibGVzKCkuc2xpY2UoLTEpWzBdXG4gICAgICAgIH0sXG4gICAgICAgIG5leHRGb2N1c2FibGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2FibGVzKClbdGhpcy5uZXh0Rm9jdXNhYmxlSW5kZXgoKV0gfHwgdGhpcy5maXJzdEZvY3VzYWJsZSgpXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZGb2N1c2FibGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2FibGVzKClbdGhpcy5wcmV2Rm9jdXNhYmxlSW5kZXgoKV0gfHwgdGhpcy5sYXN0Rm9jdXNhYmxlKClcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dEZvY3VzYWJsZUluZGV4KCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmZvY3VzYWJsZXMoKS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICsgMSkgJSAodGhpcy5mb2N1c2FibGVzKCkubGVuZ3RoICsgMSlcbiAgICAgICAgfSxcbiAgICAgICAgcHJldkZvY3VzYWJsZUluZGV4KCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIHRoaXMuZm9jdXNhYmxlcygpLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIC0gMVxuICAgICAgICB9LFxuICAgICAgICBzZXRTaG93UHJvcGVydHlUbyhzaG93KSB7XG4gICAgICAgICAgICB0aGlzLnNob3cgPSBzaG93XG5cbiAgICAgICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICAgICAgaGlkZUxvYWRpbmdJbmRpY2F0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LXktaGlkZGVuJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy15LWhpZGRlbicpXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVDb21wb25lbnQgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR3aXJlLnJlc2V0U3RhdGUoKVxuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudCgpXG5cbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICAgICAgTGl2ZXdpcmUub24oJ2Nsb3NlU2NyaWJibGVNb2RhbCcsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTY3JpYmJsZU1vZGFsKGRhdGE/LmZvcmNlID8/IGZhbHNlLCBkYXRhPy5za2lwUHJldmlvdXNNb2RhbHMgPz8gMCwgZGF0YT8uZGVzdHJveVNraXBwZWQgPz8gZmFsc2UpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICAgICAgTGl2ZXdpcmUub24oJ2FjdGl2ZVNjcmliYmxlTW9kYWxDb21wb25lbnRDaGFuZ2VkJywgKHtpZH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVNb2RhbENvbXBvbmVudChpZClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFjTyxJQUFNLHVCQUF1QixDQUFDLGNBQWMsVUFBVTtBQUN6RCxNQUFLO0FBQ0QsYUFBUyxjQUFjLDRDQUE0QyxFQUFFLFVBQVUsSUFBSSxRQUFRO0FBQUE7QUFF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
