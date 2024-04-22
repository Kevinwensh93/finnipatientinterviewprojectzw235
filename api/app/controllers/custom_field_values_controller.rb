class CustomFieldValuesController < ApplicationController
    before_action :set_patient
    before_action :set_custom_field_value, only: [:show, :update, :destroy]

    # GET /patients/:patient_id/custom_field_values
    def index
        @custom_field_values = @patient.custom_field_values
        render json: @custom_field_values
    end

    # GET /patients/:patient_id/custom_field_values/:id
    def show
        render json: @custom_field_value
    end

    # POST /patients/:patient_id/custom_field_values
    def create
        @custom_field_value = @patient.custom_field_values.build(custom_field_value_params)
        if @custom_field_value.save
        render json: @custom_field_value, status: :created, location: patient_custom_field_value_path(@patient, @custom_field_value)
        else
        render json: @custom_field_value.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /patients/:patient_id/custom_field_values/:id
    def update
        if @custom_field_value.update(custom_field_value_params)
        render json: @custom_field_value
        else
        render json: @custom_field_value.errors, status: :unprocessable_entity
        end
    end

    # DELETE /patients/:patient_id/custom_field_values/:id
    def destroy
        @custom_field_value.destroy
        head :no_content
    end

    private

    def set_patient
        @patient = Patient.find(params[:patient_id])
    end

    def set_custom_field_value
        @custom_field_value = CustomFieldValue.find(params[:id])
    end

    def custom_field_value_params
        params.require(:custom_field_value).permit(:custom_field_id, :value)
    end
end