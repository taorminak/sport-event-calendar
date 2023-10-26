<template>
  <div class="modal">
    <div class="modal__content">
      <h2 class="modal__title">
        <template v-if="isEditing">
          <input class="modal__input" v-model="editedEvent.name" />
        </template>
        <template v-else>
          {{ event.name }}
        </template>
      </h2>
      <p class="modal__description">
        <span class="modal__text">Description: </span>
        <template v-if="isEditing">
          <input class="modal__input" v-model="editedEvent.description" />
        </template>
        <template v-else>
          {{ event.description }}
        </template>
      </p>
      <div class="modal__info">
        <div>
          <span class="modal__text">Result: </span>
          <template v-if="isEditing">
            <input class="modal__input" v-model="editedEvent.result" />
          </template>
          <template v-else>
            {{ event.result }}
          </template>
        </div>
        <div>
          <span class="modal__text">Date: </span>
          <template v-if="isEditing">
            <input class="modal__input" v-model="editedEvent.date" />
          </template>
          <template v-else>
            {{ event.date }}
          </template>
        </div>
        <div>
          <span class="modal__text">Time: </span>
          <template v-if="isEditing">
            <input class="modal__input" v-model="editedEvent.time" />
          </template>
          <template v-else>
            {{ event.time }}
          </template>
        </div>
      </div>
      <div class="modal__buttons">
        <button class="modal__button" @click="closeModal">{{ saveCloseButtonLabel }}</button>
        <button class="modal__button" @click="toggleEditing">{{ editCancelButtonLabel }}</button>
        <button class="modal__button" @click="deleteEvent(event.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SportEvent } from '@/types/interfaces/sportEvent';
import { SAVE_LABEL, CLOSE_LABEL, CANCEL_LABEL, EDIT_LABEL } from '@/constants';
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['event'],
  data() {
    return {
      isEditing: false,
      editedEvent: { ...this.event },
    };
  },
  computed: {
    saveCloseButtonLabel() {
      return this.isEditing ? SAVE_LABEL : CLOSE_LABEL;
    },
    editCancelButtonLabel() {
      return this.isEditing ? CANCEL_LABEL : EDIT_LABEL;
    },
  },
  methods: {
    closeModal() {
      if (this.isEditing) {
        this.updateEventInStore(this.editedEvent);
      }
      this.$emit('close');
    },
    editModal() {
      this.isEditing = true;
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    updateEventInStore(updatedEvent: SportEvent) {
      this.$store.dispatch('events/updateEvent', updatedEvent);
    },
    deleteEvent(eventId: string) {
      this.$store.dispatch('events/deleteEvent', eventId);
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" scoped>
$primaryColor: #ac9dc5;
$primaryHoverColor: #9886b6;
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  justify-content: center;
  align-items: center;

  &__content {
    background: #fff;
    padding: 40px;
    width: 40vw;
    min-height: 40vh;
    max-width: 80%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__input {
    border: 1px solid #ccc;
    padding: 3px;
    border-radius: 4px;
    margin-bottom: 10px;
    width: 100%;
  }

  &__text {
    font-size: 18px;
    color: #333;
    padding: 1px;
    margin-bottom: 10px;
    text-align: left;
  }

  &__button {
    background-color: $primaryColor;
    min-width: 100px;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    transition: background-color 0.2s;

    &:nth-child(2) {
      background-color: #6e6c78;
    }

    &:nth-child(1) {
      background-color: #dc3545;
    }

    &:hover {
      background-color: $primaryHoverColor;
    }
  }
}
</style>
