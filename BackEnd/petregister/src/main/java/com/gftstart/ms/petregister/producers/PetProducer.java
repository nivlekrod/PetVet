package com.gftstart.ms.petregister.producers;

import com.gftstart.ms.petregister.events.PetCreatedEvent;
import com.gftstart.ms.petregister.models.PetModel;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PetProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${mq.queues.pet_created}")
    private String routingKey;

    public void publishPetCreated(PetModel petModel) {
        PetCreatedEvent event = new PetCreatedEvent(
                petModel.getPetId(),
                petModel.getName(),
                petModel.getSpecies(),
                petModel.getBreed(),
                petModel.getAge(),
                petModel.getWeight(),
                petModel.getTutor(),
                petModel.getEmailTutor()
        );

        System.out.println("Enviando mensagem para a fila: " + routingKey + " | Conteúdo: " + event);
        rabbitTemplate.convertAndSend("", routingKey, event);
    }
}
