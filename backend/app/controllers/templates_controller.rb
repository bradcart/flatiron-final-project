class TemplatesController < ApplicationController
    def show
        template = Template.find(params[:id])
        render json: template
    end  

    def create
        template = Template.create({
            identifier: params[:identifier],
            user_id: params[:user_id]
        })
        render json: template
    end

    def update
        template = Template.find(params[:id])
        template.update(identifier: params[:identifier])
        render json: template
    end
end
