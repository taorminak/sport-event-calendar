<template>
  <form id="event_form" class="new-event__form" :class="[themeClass]" ref="form" @submit.prevent="saveForm">
    <div class="new-event__group">
      <div class="new-event__field">
        <label for="eventName" class="new-event__label">Name of event (required):</label>
        <input
          type="text"
          id="eventName"
          class="new-event__input"
          :class="[themeClass]"
          v-model="formData.name"
          required
        />
      </div>
      <div class="new-event__field">
        <label for="eventDescription" class="new-event__label">Description:</label>
        <textarea id="eventDescription" class="new-event__input" :class="[themeClass]" v-model="formData.description" />
      </div>
      <div class="new-event__field">
        <label for="eventDate" class="new-event__label">Date (required):</label>
        <input
          type="date"
          id="eventDate"
          class="new-event__input"
          :class="[themeClass]"
          v-model="formData.date"
          required
        />
      </div>
      <div class="new-event__field">
        <label for="eventTime" class="new-event__label">Time (required):</label>
        <input
          type="time"
          id="eventTime"
          class="new-event__input"
          :class="[themeClass]"
          v-model="formData.time"
          required
        />
      </div>
      <div class="new-event__field">
        <label for="eventStatus" class="new-event__label"
          >Status:
          <input
            type="checkbox"
            id="eventStatus"
            class="new-event__status"
            :class="[themeClass]"
            v-model="formData.status"
          />
          Played
        </label>
      </div>
      <div class="new-event__field">
        <label for="eventResult" class="new-event__label">Result:</label>
        <input type="text" id="eventResult" class="new-event__input" :class="[themeClass]" v-model="formData.result" />
      </div>
    </div>
    <div class="new-event__buttons">
      <button class="new-event__button-save" type="submit" :disabled="!areRequiredFieldsValid">Save</button>
      <button class="new-event__button-cancel" @click="clearFormFields">Cancel</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import state from '../state';
import { v4 as uuidv4 } from 'uuid';
import { SportEvent } from '@/types/interfaces/sportEvent';
import {
  loadEventsFromLocalStorage,
  updateLocalStorageItems,
  handleError,
} from '@/helpers/data-handling/localStorageHelpers';

export default defineComponent({
  data() {
    return {
      formData: {
        id: '',
        name: '',
        description: '',
        date: state.state.selectedDate,
        time: '',
        status: false,
        result: '',
      },
      areRequiredFieldsValid: false,
    };
  },
  computed: {
    isLightTheme() {
      return this.$store.state.theme.isLightTheme;
    },
    themeClass() {
      return this.isLightTheme ? 'light' : 'dark';
    },
  },
  methods: {
    checkRequiredFields(): void {
      this.areRequiredFieldsValid =
        this.formData.name !== '' && this.formData.date !== null && this.formData.time !== '';
    },
    clearFormFields(): void {
      this.formData.id = '';
      this.formData.name = '';
      this.formData.description = '';
      this.formData.date = state.state.selectedDate || '';
      this.formData.time = '';
      this.formData.status = false;
      this.formData.result = '';
    },
    saveForm(): void {
      this.checkRequiredFields();

      if (this.areRequiredFieldsValid) {
        const formModel = {
          id: uuidv4(),
          name: this.formData.name,
          description: this.formData.description,
          date: this.formData.date.toString(),
          time: this.formData.time,
          status: this.formData.status,
          result: this.formData.result,
        };

        this.saveEventToLocalStorage(formModel);
        this.clearFormFields();
      } else {
        console.error('Form is not valid.');
      }
    },
    saveEventToLocalStorage(formModel: SportEvent): void {
      try {
        const savedEvents = loadEventsFromLocalStorage() || [];

        savedEvents.push(formModel);
        updateLocalStorageItems(savedEvents);
      } catch (error) {
        handleError(error);
      }
    },
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        this.checkRequiredFields();
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.new-event__form {
  width: 80vw;
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &.light {
    background-color: #f5f5f5;
  }

  &.dark {
    background-color: #bdb2cf;
    color: #27263d;
  }
}

.new-event__group {
  display: flex;
  flex-direction: column;
}

.new-event__field {
  margin-bottom: 10px;
}

.new-event__input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;

  &.dark {
    background-color: #dcdce7;
  }
}

.new-event__buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  .new-event__button-save,
  .new-event__button-cancel {
    min-width: 100px;
    padding: 10px 20px;
    margin-left: 30px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s;

    @media (hover: hover) {
      &:hover {
        background-color: #27263d;
        color: #fff;
      }
    }

    &:disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
    }
  }

  .new-event__button-save {
    background-color: #ac9dc5;
    margin: 5px;
  }

  .new-event__button-cancel {
    background-color: #a5a4ab;
    margin: 5px;
  }
}

@media (max-width: 1023px) {
  .new-event__form {
    width: 90vw;
  }
}

@media (max-width: 767px) {
  .new-event__buttons {
    justify-content: center;
    align-items: center;
  }
}
</style>
