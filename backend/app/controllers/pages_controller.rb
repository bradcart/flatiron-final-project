class PagesController < ApplicationController
    skip_before_action :authorized, only: [:show]
    
    def index
        pages = Page.all
        render json: pages
    end

    def show
        page = Page.find(params[:id])
        render json: page
    end
    
    def create
        page = Page.create({
            title: params[:title],
            identifier: params[:identifier],
            user_id: params[:user_id]
        })
        render json: page
    end

end
