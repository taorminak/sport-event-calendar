<template>
  <form id="event_form" class="new-event__form" ref="form" @submit.prevent="save">
    <div class="new-event__group">
      <div class="new-event__field">
        <label for="eventName" class="new-event__label">Name of event (required):</label>
        <input type="text" id="eventName" class="new-event__input" v-model="formData.name" required />
      </div>
      <div class="new-event__field">
        <label for="eventDescription" class="new-event__label">Description:</label>
        <textarea id="eventDescription" class="new-event__input" v-model="formData.description" />
      </div>
      <div class="new-event__field">
        <label for="eventDate" class="new-event__label">Date (required):</label>
        <input type="date" id="eventDate" class="new-event__input" v-model="formData.date" required />
      </div>
      <div class="new-event__field">
        <label for="eventTime" class="new-event__label">Time (required):</label>
        <input type="time" id="eventTime" class="new-event__input" v-model="formData.time" required />
      </div>
      <div class="new-event__field">
        <label for="eventStatus" class="new-event__label"
          >Status: <input type="checkbox" id="eventStatus" class="new-event__status" v-model="formData.status" /> Played
        </label>
      </div>
      <div class="new-event__field">
        <label for="eventResult" class="new-event__label">Result:</label>
        <input type="text" id="eventResult" class="new-event__input" v-model="formData.result" />
      </div>
    </div>
    <div class="new-event__buttons">
      <button class="new-event__button-save" type="submit" :disabled="!areRequiredFieldsValid">Save</button>
      <button class="new-event__button-cancel" @click="cancelEvent">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const formData = ref({
  name: '',
  description: '',
  date: '',
  time: '',
  status: false,
  result: '',
});

const areRequiredFieldsValid = ref(false);

const checkRequiredFields = () => {
  areRequiredFieldsValid.value = formData.value.name !== '' && formData.value.date !== '' && formData.value.time !== '';
};

const cancelEvent = () => {
  formData.value.name = '';
  formData.value.description = '';
  formData.value.date = '';
  formData.value.time = '';
  formData.value.status = false;
  formData.value.result = '';
};

const save = () => {
  checkRequiredFields();

  if (areRequiredFieldsValid.value) {
    const formModel = {
      name: formData.value.name,
      description: formData.value.description,
      date: formData.value.date,
      time: formData.value.time,
      status: formData.value.status,
      result: formData.value.result,
    };

    store.commit('events/addEvent', formModel);
  } else {
    console.error('Form is not valid.');
  }
};

watchEffect(() => {
  checkRequiredFields();
});
</script>

<style lang="scss">
.new-event__form {
  width: 80vw;
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.new-event__group {
  display: flex;
  flex-direction: column;
}

.new-event__field {
  margin-bottom: 10px;
}

.new-event__label {
  font-weight: bold;
}

.new-event__input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
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

    &:hover {
      background-color: #27263d;
      color: #fff;
    }

    &:disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
    }
  }

  .new-event__button-save {
    background-color: #ac9dc5;
  }

  .new-event__button-cancel {
    background-color: #a5a4ab;
  }
}
</style>
