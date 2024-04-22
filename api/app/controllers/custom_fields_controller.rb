class CustomFieldsController < ApplicationController
    before_action :set_patient

    def index
        @custom_fields = @patient.custom_fields
        render json: @custom_fields
    end

    def new
        @custom_field = @patient.custom_fields.build
    end

    def create
        @custom_field = @patient.custom_fields.build(custom_field_params)

        if @custom_field.save
            redirect_to patient_custom_fields_path(@patient), notice: 'Custom field was successfully created.'
        else
            render json: { errors: @custom_field.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def set_patient
        @patient = Patient.find(params[:patient_id])
    end

    def custom_field_params
        params.require(:custom_field).permit(:name, :value)
    end
end
